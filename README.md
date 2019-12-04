# Docker tags by SemVer Action

[![Actions status](https://github.com/weseek/ghaction-docker-tags-by-semver/workflows/Node%20CI/badge.svg)](https://github.com/weseek/ghaction-docker-tags-by-semver/actions)


This action create multiple docker tags by specified [Semantic Version](https://semver.org/) with [`docker tag` command](https://docs.docker.com/engine/reference/commandline/tag/).

# Usage

```yaml
steps:
- uses: weseek/ghaction-docker-tags-by-semver@v1
  with:
    source: 'myimage'
    target: myorg/myimage
    semver: '1.2.3'
```

exec following command:

```bash
docker tag myimage myorg/myimage:1
docker tag myimage myorg/myimage:1.2
docker tag myimage myorg/myimage:1.2.3
```

## Parameters

| parameter | required | default value | description |
| :-: | :-: | - | - |
| source | :heavy_check_mark: | | ID or name of the source docker image<br />[docker docs](https://docs.docker.com/engine/reference/commandline/tag/) |
| target | :heavy_check_mark: | | Name of the target docker image without tag<br />[docker docs](https://docs.docker.com/engine/reference/commandline/tag/) |
| semver | :heavy_check_mark: | | Semantic Version to create docker tags |
| suffix |  | | Suffix string to add to tag |
| publish |  | | Publish images or not |


# Examples

## With Suffix

```yaml
steps:
- uses: weseek/ghaction-docker-tags-by-semver@v1
  with:
    source: 'myimage'
    target: myorg/myimage
    semver: '1.2.3'
    suffix: '-nocdn'
```

exec following command:

```bash
docker tag myimage myorg/myimage:1-nocdn
docker tag myimage myorg/myimage:1.2-nocdn
docker tag myimage myorg/myimage:1.2.3-nocdn
```

## Release Candidate

If `semver` ends with `-RC`, tag with timestamp is created automatically.

```yaml
steps:
- uses: weseek/ghaction-docker-tags-by-semver@v1
  with:
    source: 'myimage'
    target: myorg/myimage
    semver: '1.2.4-RC'
```

exec following command:

```bash
docker tag myimage myorg/myimage:1.2.4-RC
docker tag myimage myorg/myimage:1.2.4-RC.20200703090000
```

## Exec Push

```yaml
steps:
- uses: weseek/ghaction-docker-tags-by-semver@v1
  with:
    source: 'myimage'
    target: myorg/myimage
    semver: '1.2.3'
    publish: true
```

exec following command:

```bash
docker tag myimage myorg/myimage:1
docker push myorg/myimage:1
docker tag myimage myorg/myimage:1.2
docker push myorg/myimage:1.2
docker tag myimage myorg/myimage:1.2.3
docker push myorg/myimage:1.2.3
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
