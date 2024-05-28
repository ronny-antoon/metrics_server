set -ew -o pipefail

export DOCKER_INFLUXDC_INIT_MODE=$DOCKER_INFLUXDC_INIT_MODE
export DOCKER_INFLUXDC_INIT_USERNAME=$DOCKER_INFLUXDC_INIT_USERNAME
export DOCKER_INFLUXDC_INIT_PASSWORD=$DOCKER_INFLUXDC_INIT_PASSWORD
export DOCKER_INFLUXDC_INIT_ADMIN_TOKEN=$DOCKER_INFLUXDC_INIT_ADMIN_TOKEN
export DOCKER_INFLUXDC_INIT_ORG=$DOCKER_INFLUXDC_INIT_ORG
export DOCKER_INFLUXDC_INIT_BUCKET=$DOCKER_INFLUXDC_INIT_BUCKET
export DOCKER_INFLUXDC_INIT_RETENTION=$DOCKER_INFLUXDC_INIT_RETENTION
export DOCKER_INFLUXDC_INIT_PORT=$DOCKER_INFLUXDC_INIT_PORT
export DOCKER_INFLUXDC_INIT_HOST=$DOCKER_INFLUXDC_INIT_HOST

## GRAFANA CONFIG
export GRAFANA_PORT=$GRAFANA_PORT

influx setup --skip-verify --bucket ${DOCKER_INFLUXDC_INIT_BUCKET} --retention ${DOCKER_INFLUXDC_INIT_RETENTION} --token ${DOCKER_INFLUXDC_INIT_ADMIN_TOKEN} --org ${DOCKER_INFLUXDC_INIT_ORG} --username ${DOCKER_INFLUXDC_INIT_USERNAME} --password ${DOCKER_INFLUXDC_INIT_PASSWORD}  --host http://${DOCKER_INFLUXDC_INIT_HOST}:${DOCKER_INFLUXDC_INIT_HOST} --force