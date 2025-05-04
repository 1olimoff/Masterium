import fs from 'fs/promises'
import prompt from 'prompts';
import path from 'path';
import {existsSync} from "fs";

console.log(process.argv);

(async () => {
    console.log("###################")
    const response = await prompt({
        type: 'select',
        name: 'type',
        message: 'What Type of arch?',
        choices: [
            {title: "page", value: 'page'}
        ]
    })
})()