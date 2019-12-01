import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

test('test runs', async() => {
    process.env['INPUT_SOURCE'] = 'node:12';
    process.env['INPUT_TARGET'] = 'mynode';
    process.env['INPUT_SEMVER'] = '12.3.4';

    const ip = path.join(__dirname, '..', 'dist', 'index.js');
    const options: cp.ExecSyncOptions = {
        env: process.env
    };

    try {
      const result = cp.execSync(`node ${ip}`, options);
      console.log(result.toString());
    }
    catch (err) {
      console.log('stdout: ', err.stdout.toString());
      console.log('stderr: ', err.stderr.toString());
      throw err;
    }
});
