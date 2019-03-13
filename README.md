
<!--#echo json="package.json" key="name" underline="=" -->
json-guillotine-pmb
===================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Split/combine a JSON meta data head with a string or buffer body.
<!--/#echo -->



API
---

```javascript
import guillotine from 'json-guillotine-pmb';
[headers, body] = guillotine.chop(blob);
blob = guillotine.recombine(headers, body);
```

* `headers`: A jsonable POJO
* `body`, `blob`: String or Buffer, same type as the other.



Usage
-----

see [test/basics.js](test/basics.js)


<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
