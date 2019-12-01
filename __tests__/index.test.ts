import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

test('test runs', () => {
    process.env['INPUT_SOURCE'] = 'node:12';
    process.env['INPUT_TARGET'] = 'node';
    process.env['INPUT_SEMVER'] = '12.0.0';

    const ip = path.join(__dirname, '..', 'dist', 'index.js');
    const options: cp.ExecSyncOptions = {
        env: process.env
    };
    console.log(cp.execSync(`node ${ip}`, options).toString());
});
