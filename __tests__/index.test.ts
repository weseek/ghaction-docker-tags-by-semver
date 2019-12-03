import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

describe.each`
  semver          | suffix
  ${'12.3.4'}     | ${''}
  ${'12.3.4'}     | ${'-nocdn'}
  ${'12.3.4-RC'}  | ${'-nocdn'}
`('test runs', ({semver, suffix}) => {
  test(`with semver='${semver}', suffix='${suffix}'`, () => {
    process.env['INPUT_SOURCE'] = 'node:12';
    process.env['INPUT_TARGET'] = 'mynode';
    process.env['INPUT_SEMVER'] = semver;
    process.env['INPUT_SUFFIX'] = suffix;
    process.env['INPUT_PUBLISH'] = false;

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
});
