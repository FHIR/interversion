# FHIR Transformer Specification

## Introduction

This document describes a portable transformation engine that can be used to convert different kinds of source material into a FHIR repository or a Bundle. 

## Components 

The conversion engine offers the following services to support conversion of content to FHIR:

* Javascript Engine 
* FHIR Mapping Language Engine
* Liquid Template Engine (processes JSON, XML, HTML or Markdown) 
* Terminology and other conversion services 
* Other? MDMI? 

# Javascript Engine Documentation

## Conversion process

When the host application or context initiates a conversion, the 
engine calls (via configuration) a javascript routine with this
signature:

    function convert(engine, object, api) {
    }

Parameters:

* _engine_: an object that makes conversion/transformation services available to the script - see below for documentation
* _object_: the source object being converted - see below for documentation and specifications
* _api_: provides direct access to the FHIR database, authorised as appropriate. See below for documentation
* _return_: there is no return fucnction

The convert function is responsible for the logic of breaking up the content of the incoming object, matching 
it to existing resources, and either merging updated information into the existing resources, or creating new 
resources. Alternatively, the routine may create any number of resources (often Bundles), and provide them to
the host application for further handling.

This javascript code has to coordinate the overall conversion process, and handles the 
matching and committing against the FHIR repository. Actual mapping from the source content
to FHIR resources can be done in several different ways:

* Just writing the code in javscript - this is the least efficient way to express the conversion, but it is the most robust
* Using the FHIR Mapping language - this is an efficient way to perform complex conversions, but not very good at managing merging the update with an existing resource
* Using a liquid template (or a set of them) - this is the easiest way to perform simple conversions, but is not useable for managing merging
* Others to be defined...

The javascript code uses the services defined on the engine object to launch the non javascript kind of conversions.

## Example

Here's a simple javascript that illustrates how this might all come together:

    // for use with ADT_A01 message
	function convert(engine, object, api) {
    
	  // first step: process the patient
	  var pid = msg.segment[2];
	  var patid = pid.field[3].element[1].text;
	  // or it could be:  patid = pid.q('field[3].element.where(component[5] = "MR").text');
    
	  var pat = api.read('Patient', pid); // assuming that we store patients with MYN as master
	  if (pat == null)
		pat = makePatient(engine, pid, api);
	  else
		updatePatient(pat, pid, api);
    
	  // now: process the encounter
	}
    
	function makePatient(engine, pid, api) {
	  var pat = engine.liquid("pid.liquid", pid, "Patient", "json");
	  return api.create(pat);
	}

	function updatePatient(pat, pid, api) {
	  // todo....
	}


## Engine

This object exposes a number of useful services to help with the conversion process.

### factory

    factory(typeName)

Creates an object of the type named.  

Parameters:
* _typeName_: The name of the type to create
* _returns_: the constructed type (or an exception)

The type name can be one of:
* a resource name (e.g. "Patient")
* a data type name (e.g. "Identifier")
* a path in a type or resource (e.g. "Patient.contact", "Timing.repeat")

The returned object conforms to the UML view of the type in the FHIR specification.

### js

    ja(scriptName, routineName, params...)

Calls the named Javascript method with the params provided, and 
returns the specified result. 

Parameters:
* _scriptName_: The name of the file that contains the script
* _routineName_:  The name of the javascript routine to execute
* _params_: zero or more parameters to pass to the routine
* _returns_: whatever is returned from the invoked routine (or an exception)

> Todo: how script name is resolved to source content.

### map

    map(url, source[, target])

Run the nominated StructureMap (by URL) to convert content. 

Parameters:
* _url_: The canonical URL of the StructureMap to use for the conversion
* _source_: The object to pass to the conversion routine
* _target_: [optional] An existing target object to pass to the routine
* _returns_: the created object, if not target is provided, else null (or an exception)

> Todo: how does the provision of structure maps to the application work? 

### liquid

    liquid(fileName, source, type[, format])

Use a liquid template to create a datatype or resource

Parameters:
* _filename_: The name of the file that contains the liquid template to use
* _source_: The object to use as the focus of the liquid template
* _type_: The FHIR resource name or type name to parse the liquid output as
* _format_: [Optional] The format that is produced by processing the template. Valid values: json, xml, xhtml
* _returns_: the created object (or an exception)

See below for liquid engine documentation

### markdown

    markdown(fileName, source)

Use a liquid template that contains markdown to create a Narrative data type 

Parameters:
* _filename_: The name of the file that contains the liquid template to use
* _source_: The object to use as the focus of the liquid template
* _returns_: the created div ready to use in an resource narrative (or an exception)


### convertUri

    function convertUri(value, type)

Converts between FHIR URIs and v3 OIDs or V2 table 0396 code

Parameters:
* _value_: The existing identifier namespace to convert from
* _type_:  The type to return - one of uri, oid, or v2 
* _returns_: The specifed value if available, else null

This look up is based on naming systems and/or magically known comparisons

### convertQty

    function convertQty(value, srcUnit, tgtUnit);

Converts a quantity from one unit to another (using UCUM)

* _srcCode_: The value to translate from (a decimal; can be a string if the string implicity converts to a number)
* _srcUnit_: The UCUM unit for the value
* _tgtUnit_:  The UCUM unit to return the value in
* _returns_: The converted value as a decimal, or null if there is none

Conversion is done consistently with the definitions in UCUM

### convertCode

    function convertCode(srcCode, srcSystem, tgtSystem); 

Parameters:
* _srcCode_: The code to translate from
* _srcSystem_: The URI of the system to translate from
* _tgtSystem_:  The URI of the system to translate to
* _returns_: The code in the target system, or null if there is none

This is a call to the [$translate operation](http://hl7.org/fhir/conceptmap-operation-translate.html).


## FHIR API Object

### read 

    function read(type, id)

Performs a [read interaction](http://hl7.org/fhir/http.html#read). Parameters:
* _type_: The type of resource to search
* _id_: the id of the resource to fetch
* _returns_: an array of resources, in the order returned by the server

### search

    function search(type, params)

Performs a [search interaction](http://hl7.org/fhir/http.html#search). Parameters:
* _type_: The type of resource to fetch 
* _params_: the parameters string for the search
* _returns_: an array of resources, in the order returned by the server

### create

    function create(resource)

Performs a [create interaction](http://hl7.org/fhir/http.html#create). Parameters:
* _resource_: The FHIR Resource to commit to the server
* _returns_: the created resource, with id populated

### update

    function update(resource)

Performs a [create interaction](http://hl7.org/fhir/http.html#create). Parameters:
* _resource_: The FHIR Resource to commit to the server, with id populated
* _returns_: the created resource, with id populated

### delete

    function delete(type, id)

Performs a [create interaction](http://hl7.org/fhir/http.html#create). Parameters:
* _type_: The type of resource to delete
* _id_: the id of the resource to delete
* _returns_: a boolean if the resource was deleted

### version

    function version()

Gets the version of FHIR that the API is using. 

* _returns_: one of ```1.0```, ```3.0```, ```4.0``` 

## FHIR UML View

Access to the FHIR objects is based on the UML view of FHIR in
the specification. Each type is a class, that expresses a set of 
properties with the following rules:

* a named property for each attribute or association 
* the name is the same, *except for polymorphic properties* which have [x] removed
* attributes or associations that have cardinality ..* (e.g repeating elements) property type is an array
* the primitive FHIR types are also clases, with id, extension and value properties. The value property is a Javascript primitive (using the same mapping as the JSON format)

In addition to the features defined in the UML view, all the 
FHIR objects have this base API:

    function version()

Gets the version of FHIR that the object conforms to. 

* _returns_: one of ```1.0```, ```3.0```, ```4.0``` 

    function typeName()

Returns the FHIR type of the object. Note that this might not be the same as the javascript class name of the object

* _returns_: The type name (see factory above)


## Source Object 

An object that represents the incoming content that is to be processed 
into the FHIR repository 

The following types are currently defined:
* FHIR Resource
* HL7 V2 Object
* CDA Document

## FHIR Resource

This is a resource that conforms to the UML view (see above) of the FHIR version 
of the incoming resource. This may not be the same version as that being created. 
Complex objects cannot be assigned across versions; only primitive type values can be 
assigned e.g. for p2 and p4 being Patient objects in release 2 and 4 respectively:

* illegal: ```p2.contacts.add(p4.contact[0]);```
* illegal: ```p2.active = p4.active```
* legal: ```p2.active.value = p4.active.value```

## HL7 V2 Message

This is an object that has properties and functions as defined in
the [V2 model in the FHIRPath spec](http://hl7.org/fhirpath/2018Sep/index.html#hl7v2)

In addition, all v2 objects have these routines:

    function typeName()

Returns the v2 type of the object. Note that this might not be the same as the javascript class name of the object

* _returns_: The type name - one of Message, Segment, Field, Cell, Group


## CDA Document

This is an object that has properties and functions as defined in
[the CDA logical Model](https://build.fhir.org/ig/HL7/fhir-cda/)

In addition, all CDA objects have these routines:

    function typeName()

Returns the CDA type of the object. Note that this might not be the same as the javascript class name of the object

* _returns_: The class name as specified in the CDA RMIM, or the Data types definition (actually, as published in [the CDA logical Model](https://build.fhir.org/ig/HL7/fhir-cda/) 


# StructureMap Engine Documentation

[todo]

# Liquid Engine Documentation

The Liquid Engine conforms to the [FHIR Liquid Engine Specification](http://wiki.hl7.org/index.php?title=FHIR_Liquid_Profile). 

The liquid template can produce json, xml, or xhtml. Format Notes:
* json: Must be a valid FHIR resource (or data type). For user convenience, commas should be treated as whitespace 
  (see [here](https://www.tbray.org/ongoing/When/201x/2016/08/20/Fixing-JSON)
   and [here](https://www.tbray.org/ongoing/When/201x/2016/08/22/Fixing-JSON-Redux)
* xml: Must be a valid FHIR resource (or data type).
* xhtml: The root node must be \<div\>. The namespace does not matter (it will be corrected to the xhtml namespace)

# Markdown Engine Documentation

This works the same as the Liquid Engine, but produces markdown, which is then processed to xhtml. The markdown dialect in use is [GFM](https://github.github.com/gfm/). 
