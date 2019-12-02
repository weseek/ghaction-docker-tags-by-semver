import * as core from '@actions/core';
import { exec } from '@actions/exec';

import format from 'date-fns/format';

/**
 * Parse and create tags
 *
 * @param semver Semantic version string
 * @param suffix Suffix string to append to trailing of each tags
 * @returns Array of tags
 */
function parseSemVer(semver: string, suffix: string): Array<string> {
  // https://regex101.com/r/sxGQtU/2
  const match: RegExpMatchArray | null = semver.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)(-RC[0-9]*)?$/);
  if (match == null) {
    throw new Error(`Param 'semver' is invalid: ${semver}`);
  }

  const all = match[0];
  const major = match[1];
  const minor = match[2];
  const patch = match[3];
  const rc = match[4];

  core.debug(`all=${all}`);
  core.debug(`major=${major}`);
  core.debug(`minor=${minor}`);
  core.debug(`patch=${patch}`);
  core.debug(`rc=${rc}`);

  const tags: Array<string> = [];

  if (rc != null) {
    const date: string = format(new Date(), 'yyyyMMddhhmmss');
    tags.push(all);
    tags.push(`${all}.${date}`);
  }
  else {
    tags.push(`${major}${suffix}`);
    tags.push(`${major}.${minor}${suffix}`);
    tags.push(`${major}.${minor}.${patch}${suffix}`);
  }

  return tags;
}

async function run() {
  try {
    // check docker command
    await exec('docker', ['-v']);

    const source: string = core.getInput('source', { required: true });
    const target: string = core.getInput('target', { required: true });
    const semver: string = core.getInput('semver', { required: true });
    const suffix: string = core.getInput('suffix'); // default: ''

    // generate tags
    const tags: Array<string> = parseSemVer(semver, suffix);

    // exec 'docker tag' command
    for (const tag of tags) {
      await exec('docker', ['tag', source, `${target}:${tag}`]);
    }

    core.setOutput('tags', tags.join(', '));
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run();
