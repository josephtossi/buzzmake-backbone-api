const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const fs = require('fs');
const fsPromises = require('fs').promises;

const csv = require('csv-parser');
const path = require('path');

function resolvePath(relativePath) {
    return path.resolve(__dirname, relativePath);
}

async function loadData(filePath) {
    const data = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const preprocessedRow = preprocessRow(row);
                data.push(preprocessedRow);
            })
            .on('end', () => {
                resolve(data);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

function preprocessRow(row) {
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
        experienceLevelMap[row.experience_level],
        employmentTypeMap[row.employment_type],
        jobTitleMap[row.job_title],
        parseFloat(row.salary),
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

async function trainModel() {
    const data = await loadData('./training_data/ds_salaries.csv');
    const model = createModel();
    // features
    const xs = tf.tensor2d(data.map(row => row.slice(0, -1)));
    // labels
    const ys = tf.tensor2d(data.map(row => [row[row.length - 1]]));

    await model.fit(xs, ys, {
        epochs: 10,
        shuffle: true,
        callbacks: {
            // check epock and loss rate
            onEpochEnd: (epoch, logs) => console.log(`epoch ${epoch}: loss = ${logs.loss}`),
        }
    });

    console.log('training completed');

    // save the model
    const modelPath = './saved_models';
    await fsPromises.mkdir(modelPath, { recursive: true });
    await model.save(`file://${modelPath}`);
    console.log('Model saved at:', modelPath);
}

trainModel().catch(console.error);