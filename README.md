# Gregorian

Open Source package that provides a matrix representation of a calendar for use with a custom frontend.

## Install

`npm install gregorian`

## Usage

### Use class

```js
import Gregorian from "../utils/gregorian.js";

const now = new Date();
const greg = new Gregorian(now);
```

### Use instance

```js
import { gregorian as greg } from "gregorian";
```

### Use (React) Calendar

```js
import { Calendar } from "gregorian";

<Calendar />;
```

### Use (React) Calendar Input

TBD...

## Contribute

Clone the Repository:

`git clone path_to_repo`
