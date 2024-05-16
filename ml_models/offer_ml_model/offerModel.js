const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const csv = require('csv-parser');

// implementing the 80% train - 20% test rule 
async function loadData(filePath, splitRatio = 0.8) {
    const data = [];
    // loading the data in promise either resolve or reject
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                // preprocessing data
                const preprocessedRow = preprocessRow(row);
                // adding the preprocessed data to list data
                data.push(preprocessedRow);
            })
            .on('end', () => {
                // split the data to train and test data
                const splitIndex = Math.floor(data.length * splitRatio);
                const trainingData = data.slice(0, splitIndex);
                const testingData = data.slice(splitIndex);
                resolve({ trainingData, testingData });
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

function preprocessRow(row) {
    // changing types to numerical values 
    const experienceLevelMap = { 'SE': 0, 'MI': 1, 'EN': 2, 'EX': 3 };
    const employmentTypeMap = { 'FT': 0, 'CT': 1 };
    const companyLocationMap = { 'US': 0, 'CA': 1, 'DE': 2, 'GB': 3, 'IN': 4, 'HK': 5, 'NG': 6, 'ES': 7, 'PT': 8 };
    const companySizeMap = { 'S': 0, 'M': 1, 'L': 2 };
    const jobTitleMap = {
        'Principal Data Scientist': 0,
        'ML Engineer': 1,
        'Data Scientist': 2,
        'Applied Scientist': 3,
        'Data Analyst': 4,
        'Data Modeler': 5,
        'Research Engineer': 6,
        'Analytics Engineer': 7,
        'Business Intelligence Engineer': 8,
        'Machine Learning Engineer': 9,
        'Data Strategist': 10,
        'Data Engineer': 11,
        'Computer Vision Engineer': 12,
        'Data Architect': 13,
        'Applied Machine Learning Engineer': 14,
        'AI Developer': 15,
        'Data Quality Analyst': 16,
        'Compliance Data Analyst': 17
    };

    return [
        parseInt(row.work_year),
        experienceLevelMap[row.experience_level] || -1,
        employmentTypeMap[row.employment_type] || -1,
        jobTitleMap[row.job_title] || -1,
        parseFloat(row.salary_in_usd),
        parseFloat(row.remote_ratio),
        companyLocationMap[row.company_location] || -1,
        companySizeMap[row.company_size] || -1
    ];
}

function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [7] }));
    model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1 }));
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
    return model;
}

async function evaluateModel(model, testData) {
    const testXs = tf.tensor2d(testData.map(row => row.slice(0, -1)));
    const testYs = tf.tensor2d(testData.map(row => [row[row.length - 1]]));

    const evaluation = await model.evaluate(testXs, testYs);

    console.log('Evaluation results:');
    for (let idx = 0; idx < evaluation.length; idx++) {
        console.log(`Metric ${idx}: ${evaluation[idx]}`);
    }

    const predictions = model.predict(testXs);

    // tensors to arrays
    const trueValues = await testYs.array();
    const predValues = await predictions.array();

    console.log('True Values\tPredicted Values');
    for (let i = 0; i < trueValues.length; i++) {
        console.log(`${trueValues[i][0]}\t\t${predValues[i][0]}`);
    }
}


async function trainModel(trainingData) {
    const model = createModel();
    // features
    const xs = tf.tensor2d(trainingData.map(row => row.slice(0, -1)));
    // labels
    const ys = tf.tensor2d(trainingData.map(row => [row[row.length - 1]]));
    await model.fit(xs, ys, {
        epochs: 10,
        shuffle: true,
        callbacks: {
            onEpochEnd: (epoch, logs) => console.log(`epoch ${epoch}: loss = ${logs.loss}`),
        }
    });

    console.log('training completed');

    return model;
}

async function testModel() {
    const { trainingData, testingData } = await loadData('./training_data/ds_salaries.csv', 0.8);
    const model = await trainModel(trainingData);
    await evaluateModel(model, testingData);
}

testModel().catch(console.error);