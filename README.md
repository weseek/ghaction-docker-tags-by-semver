# Docker tags by SemVer Action

<p align="left">
</p>

This action create multiple docker tags by specified [Semantic Version](https://semver.org/) with [`docker tag` command](https://docs.docker.com/engine/reference/commandline/tag/).

# Usage

## Minimum Example

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

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
