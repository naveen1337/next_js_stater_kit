
## Create view payload
```json
{
	"viewName":"inventory",
	"shortDesc":"view of inventory",
	"longDesc":"will list all the inventory here",
	"columns":{
		"id":{
			"name":"ID",
			"info":"Identify of the row",
			"constrint":{
    			"type":"AUTO_INCREMENT_PRIMARY"
            },
            "refrence":null
		},
		"sku":{
			"name":"SKU",
			"info":"Stock keeping unit",
			"constrint":{
                "type":"STRING",
                "unique":true,
			    "required":true,
            },
            "refrence":null
		}
	}
}
```
