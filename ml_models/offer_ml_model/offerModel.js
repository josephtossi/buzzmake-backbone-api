const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const csv = require('csv-parser');
// get mappings for transforming labels to numberical values
const { experienceLevelMap, employmentTypeMap, companyLocationMap, companySizeMap, jobTitleMap } = require('./mappings.js');

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
    return [
        parseInt(row.work_year),
        experienceLevelMap[row.experience_level],
        employmentTypeMap[row.employment_type],
        jobTitleMap[row.job_title],
        parseFloat(row.salary_in_usd),
        parseFloat(row.remote_ratio),
        companyLocationMap[row.company_location],
        companySizeMap[row.company_size]
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

    checkErrorMargin(trueValues, predValues);
    return model;
}

function checkErrorMargin(trueValues, predValues) {
    const marginErrors = [];
    for (let i = 0; i < trueValues.length; i++) {
        const marginError = Math.abs(trueValues[i][0] - predValues[i][0]);
        marginErrors.push(marginError);
    }
    const meanAbsoluteError = marginErrors.reduce((acc, val) => acc + val, 0) / marginErrors.length;
    const meanSquaredError = marginErrors.reduce((acc, val) => acc + Math.pow(val, 2), 0) / marginErrors.length;

    console.log(`mean ABSOLUTE error: ${meanAbsoluteError}`);
    console.log(`mean SQUARED error: ${meanSquaredError}`);
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

async function testOfferMlModel() {
    const { trainingData, testingData } = await loadData('./training_data/ds_salaries.csv', 0.8);
    const model = await trainModel(trainingData);
    await evaluateModel(model, testingData);
}


testOfferMlModel()
    .catch(console.error);