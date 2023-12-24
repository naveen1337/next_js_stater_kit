# Create View

```json
{
	"viewName": "inventory",
	"shortDesc": "view of inventory",
	"longDesc": "will list all the inventory list",
	"columns": [
		{
			"identifier": "id",
			"name": "ID",
			"info": "Identify of the row",
			"constraint": {
				"type": "AUTO_INCREMENT_PRIMARY"
			},
			"reference": null
		},
		{
			"identifier": "sku",
			"name": "SKU",
			"info": "Stock keeping unit",
			"constraint": {
				"type": "STRING",
				"unique": true,
				"required": true,
				"minLength": 1,
				"maxLength": 255
			},
			"reference": null
		},
		{
			"identifier": "createdAt",
			"name": "Created At",
			"info": "Datetime of created",
			"constraint": {
				"type": "DATETIME",
				"unique": false,
				"required": true,
				"minDate": null,
				"maxDate": null
			},
			"reference": null
		},
		{
			"identifier": "updatedAt",
			"name": "updated At",
			"info": "Last updated at",
			"constraint": {
				"type": "DATETIME",
				"unique": true,
				"required": true,
				"minDate": null,
				"maxDate": null
			},
			"reference": null
		}
	]
}
```

## AUTO_INCREMENT_PRIMARY
1. will be the auto increment primary key

## String
1. Is should have a min lenfth 
2. Is should have an max length
3. IS Should have an required flag
4. Is should unique flag

## Datetime
1. Is Should have a requied flag 
2. Is minDate
3. Is maxDate
4. Is Should be in the form of ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ) [2023-12-01T14:30:00.000Z]
5. Is unique flag


## Integer
1. should have an required
2. min value
3. max value

## Currency
1. Should have an required
2. min value 
3. max value
4. country code
