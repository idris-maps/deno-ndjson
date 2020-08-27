# deno-ndjson

CLI tools for dealing with [ndjson](http://ndjson.org/) in [Deno](https://deno.land/). Heavily inspired by [ndjson-cli](https://github.com/mbostock/ndjson-cli) for [node](https://nodejs.org).

## `ndj-cat`

reads a `ndjson` file into the console line by line

### install

```bash
deno install --allow-read https://raw.githubusercontent.com/idris-maps/deno-ndjson/master/ndj-cat.ts
```

### usage

```bash
ndj-cat <PATH_TO_NDJSON_FILE>
```

#### example

```bash
ndj-cat some_folder/file.ndjson
```

## `ndj-map`

maps every line of an `ndjson`.

Takes one argument, the expression to map.

The expression assumes there are two arguments:

* `d`, the `json` line
* `i`, the index of the line

### install

```bash
deno install https://raw.githubusercontent.com/idris-maps/deno-ndjson/master/ndj-map.ts
```

### usage

```bash
ndj-map <EXPRESSION>
```

#### example

Suppose you have a `file.ndjson` such as:

```
{"nom":"Lausanne","population":138905}
{"nom":"Yverdon-les-Bains","population":30143}
{"nom":"Montreux","population":26574}
{"nom":"Renens","population":21036}
{"nom":"Nyon","population":20533}
{"nom":"Vevey","population":19827}
```

```bash
ndj-cat file.ndjson \
| ndj-map '({ index: i, town: d.nom })'
```

will return

```
{"index":0,"town":"Lausanne"}
{"index":1,"town":"Yverdon-les-Bains"}
{"index":2,"town":"Montreux"}
{"index":3,"town":"Renens"}
{"index":4,"town":"Nyon"}
{"index":5,"town":"Vevey"}
```

## `ndj-filter`

filters lines of an `ndjson`.

Takes one argument, an expression that assumes two arguments:

* `d`, the `json` line
* `i`, the index of the line

### install

```bash
deno install https://raw.githubusercontent.com/idris-maps/deno-ndjson/master/ndj-filter.ts
```

### usage

```bash
ndj-filter <EXPRESSION>
```

#### example

Suppose you have a `file.ndjson` such as:

```
{"nom":"Lausanne","population":138905}
{"nom":"Yverdon-les-Bains","population":30143}
{"nom":"Montreux","population":26574}
{"nom":"Renens","population":21036}
{"nom":"Nyon","population":20533}
{"nom":"Vevey","population":19827}
```

```bash
ndj-cat file.ndjson \
| ndj-filter 'd.population > 30000'
```

will return

```
{"nom":"Lausanne","population":138905}
{"nom":"Yverdon-les-Bains","population":30143}
```

## `ndj-reduce`

reduces an `ndjson`.

Takes either no arguments or two arguments.

If there are no arguments, it will return a `json` array.

If there are arguments, there must be two: the expression and the initial value. The expression assumes three arguments:

* `a`, the accumulator
* `d`, the `json` line
* `i`, the index

### install

```bash
deno install https://raw.githubusercontent.com/idris-maps/deno-ndjson/master/ndj-reduce.ts
```

### usage

```bash
ndj-reduce

## or

ndj-reduce <EXPRESSION> <INITIAL_VALUE>
```

#### examples

Suppose you have a `file.ndjson` such as:

```
{"nom":"Lausanne","population":138905}
{"nom":"Yverdon-les-Bains","population":30143}
{"nom":"Montreux","population":26574}
{"nom":"Renens","population":21036}
{"nom":"Nyon","population":20533}
{"nom":"Vevey","population":19827}
```

```bash
ndj-cat file.ndjson \
| ndj-reduce
```

without arguments, it will return

```json
[{"nom":"Lausanne","population":138905},{"nom":"Yverdon-les-Bains","population":30143},{"nom":"Montreux","population":26574},{"nom":"Renens","population":21036},{"nom":"Nyon","population":20533}]
```

```bash
ndj-cat file.ndjson \
| ndj-reduce 'a + d.population' 0
```

with arguments, it will return

```
237191
```
