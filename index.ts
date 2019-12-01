import * as core from '@actions/core';
import { exec } from '@actions/exec';

async function run() {
  try {
    const source: string = core.getInput('source');
    const target: string = core.getInput('target');
    const semver: string = core.getInput('semver');
    const suffix: string = core.getInput('suffix');
    
    await exec('docker', ['tag', source, `${target}:latest`]);

    core.setOutput('time', new Date().toTimeString());
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run();
