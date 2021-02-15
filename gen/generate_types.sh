#!/usr/bin/env bash

hydraVer="v1.9.2"
kratosVer="v0.5.5-alpha.1"
oathkeeperVer="v0.38.6-beta.1"
ketoVer="v0.5.7-alpha.1"

curl -X GET "https://raw.githubusercontent.com/ory/hydra/${hydraVer}/.schema/config.schema.json" > ../src/json/hydra.json
curl -X GET "https://raw.githubusercontent.com/ory/kratos/${kratosVer}/.schema/config.schema.json" > ../src/json/kratos.json
curl -X GET "https://raw.githubusercontent.com/ory/keto/${ketoVer}/.schema/config.schema.json" > ../src/json/keto.json
curl -X GET "https://raw.githubusercontent.com/ory/oathkeeper/${oathkeeperVer}/.schema/config.schema.json" > ../src/json/oathkeeper.json

#json2ts hydra.json > ../src/models/Hydra.d.ts
#json2ts kratos.json > ../src/models/Kratos.d.ts
#json2ts oathkeeper.json > ../src/models/Oathkeeper.d.ts
#json2ts keto.json > ../src/models/Keto.d.ts
