# d3-random

Generate random numbers from various distributions. For seeded random number generation, see [*random*.source](#random_source) and [randomLcg](#randomLcg).

## randomUniform(*min*, *max*) {#randomUniform}

```js
d3.randomUniform(6)() // a number greater than or equal to 0 and less than 6
```
```js
d3.randomUniform(1, 5)() // a number greater than or equal to 1 and less than 5
```

[Examples](https://observablehq.com/@d3/d3-random#uniform) · [Source](https://github.com/d3/d3-random/blob/main/src/uniform.js) · Returns a function for generating random numbers with a [uniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_\(continuous\)). The minimum allowed value of a returned number is *min* (inclusive), and the maximum is *max* (exclusive). If *min* is not specified, it defaults to 0; if *max* is not specified, it defaults to 1. For example:

## randomInt(*min*, *max*) {#randomInt}

```js
d3.randomInt(6)() // an integer greater than or equal to 0 and less than 6
```
```js
d3.randomInt(1, 5)() // an integer greater than or equal to 1 and less than 5
```

[Examples](https://observablehq.com/@d3/d3-random#int) · [Source](https://github.com/d3/d3-random/blob/main/src/int.js) · Returns a function for generating random integers with a [uniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_\(continuous\)). The minimum allowed value of a returned number is ⌊*min*⌋ (inclusive), and the maximum is ⌊*max* - 1⌋ (inclusive). If *min* is not specified, it defaults to 0. For example:

## randomNormal(*mu*, *sigma*) {#randomNormal}

```js
d3.randomNormal(0, 1)
```

[Examples](https://observablehq.com/@d3/d3-random#normal) · [Source](https://github.com/d3/d3-random/blob/main/src/normal.js) · Returns a function for generating random numbers with a [normal (Gaussian) distribution](https://en.wikipedia.org/wiki/Normal_distribution). The expected value of the generated numbers is *mu*, with the given standard deviation *sigma*. If *mu* is not specified, it defaults to 0; if *sigma* is not specified, it defaults to 1.

## randomLogNormal(*mu*, *sigma*) {#randomLogNormal}

```js
d3.randomLogNormal(0, 1)
```

[Examples](https://observablehq.com/@d3/d3-random#logNormal) · [Source](https://github.com/d3/d3-random/blob/main/src/logNormal.js) · Returns a function for generating random numbers with a [log-normal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution). The expected value of the random variable’s natural logarithm is *mu*, with the given standard deviation *sigma*. If *mu* is not specified, it defaults to 0; if *sigma* is not specified, it defaults to 1.

## randomBates(*n*) {#randomBates}

```js
d3.randomBates(3)
```

[Examples](https://observablehq.com/@d3/d3-random#bates) · [Source](https://github.com/d3/d3-random/blob/main/src/bates.js) · Returns a function for generating random numbers with a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution) with *n* independent variables. The case of fractional *n* is handled as with d3.randomIrwinHall, and d3.randomBates(0) is equivalent to d3.randomUniform().

## randomIrwinHall(*n*) {#randomIrwinHall}

```js
d3.randomIrwinHall(3)
```

[Examples](https://observablehq.com/@d3/d3-random#irwinHall) · [Source](https://github.com/d3/d3-random/blob/main/src/irwinHall.js) · Returns a function for generating random numbers with an [Irwin–Hall distribution](https://en.wikipedia.org/wiki/Irwin–Hall_distribution) with *n* independent variables. If the fractional part of *n* is non-zero, this is treated as adding d3.randomUniform() times that fractional part to the integral part.

## randomExponential(*lambda*) {#randomExponential}

```js
d3.randomExponential(1 / 40)
```

[Examples](https://observablehq.com/@d3/d3-random#exponential) · [Source](https://github.com/d3/d3-random/blob/main/src/exponential.js) · Returns a function for generating random numbers with an [exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution) with the rate *lambda*; equivalent to time between events in a [Poisson process](https://en.wikipedia.org/wiki/Poisson_point_process) with a mean of 1 / *lambda*. For example, randomExponential(1 / 40) generates random times between events where, on average, one event occurs every 40 units of time.

## randomPareto(*alpha*) {#randomPareto}

```js
d3.randomPareto(1.16)
```

[Examples](https://observablehq.com/@d3/d3-random#pareto) · [Source](https://github.com/d3/d3-random/blob/main/src/pareto.js) · Returns a function for generating random numbers with a [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution) with the shape *alpha*. The value *alpha* must be a positive value.

## randomBernoulli(*p*) {#randomBernoulli}

```js
d3.randomBernoulli(0.5)
```

[Examples](https://observablehq.com/@d3/d3-random#bernoulli) · [Source](https://github.com/d3/d3-random/blob/main/src/bernoulli.js) · Returns a function for generating either 1 or 0 according to a [Bernoulli distribution](https://en.wikipedia.org/wiki/Binomial_distribution) with 1 being returned with success probability *p* and 0 with failure probability *q* = 1 - *p*. The value *p* is in the range [0, 1].

## randomGeometric(*p*) {#randomGeometric}

```js
d3.randomGeometric(0.5)
```

[Examples](https://observablehq.com/@d3/d3-random#geometric) · [Source](https://github.com/d3/d3-random/blob/main/src/geometric.js) · Returns a function for generating numbers with a [geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution) with success probability *p*. The value *p* is in the range [0, 1].

## randomBinomial(*n*, *p*) {#randomBinomial}

```js
d3.randomBinomial(4, 0.5)
```

[Examples](https://observablehq.com/@d3/d3-random#binomial) · [Source](https://github.com/d3/d3-random/blob/main/src/binomial.js) · Returns a function for generating random numbers with a [binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution) with *n* the number of trials and *p* the probability of success in each trial. The value *n* is greater or equal to 0, and the value *p* is in the range [0, 1].

## randomGamma(*k*, *theta*) {#randomGamma}

```js
d3.randomGamma(2, 1)
```

[Examples](https://observablehq.com/@parcly-taxel/the-gamma-and-beta-distributions) · [Source](https://github.com/d3/d3-random/blob/main/src/gamma.js) · Returns a function for generating random numbers with a [gamma distribution](https://en.wikipedia.org/wiki/Gamma_distribution) with *k* the shape parameter and *theta* the scale parameter. The value *k* must be a positive value; if *theta* is not specified, it defaults to 1.

## randomBeta(*alpha*, *beta*) {#randomBeta}

```js
d3.randomBeta(3, 1.5)
```

[Examples](https://observablehq.com/@parcly-taxel/the-gamma-and-beta-distributions) · [Source](https://github.com/d3/d3-random/blob/main/src/beta.js) · Returns a function for generating random numbers with a [beta distribution](https://en.wikipedia.org/wiki/Beta_distribution) with *alpha* and *beta* shape parameters, which must both be positive.

## randomWeibull(*k*, *a*, *b*) {#randomWeibull}

```js
d3.randomWeibull(-2)
```

[Examples](https://observablehq.com/@parcly-taxel/frechet-gumbel-weibull) · [Source](https://github.com/d3/d3-random/blob/main/src/weibull.js) · Returns a function for generating random numbers with one of the [generalized extreme value distributions](https://en.wikipedia.org/wiki/Generalized_extreme_value_distribution), depending on *k*:

* If *k* is positive, the [Weibull distribution](https://en.wikipedia.org/wiki/Weibull_distribution) with shape parameter *k*
* If *k* is zero, the [Gumbel distribution](https://en.wikipedia.org/wiki/Gumbel_distribution)
* If *k* is negative, the [Fréchet distribution](https://en.wikipedia.org/wiki/Fréchet_distribution) with shape parameter −*k*

In all three cases, *a* is the location parameter and *b* is the scale parameter. If *a* is not specified, it defaults to 0; if *b* is not specified, it defaults to 1.

## randomCauchy(*a*, *b*) {#randomCauchy}

```js
d3.randomCauchy(0, 1)
```

[Examples](https://observablehq.com/@parcly-taxel/cauchy-and-logistic-distributions) · [Source](https://github.com/d3/d3-random/blob/main/src/cauchy.js) · Returns a function for generating random numbers with a [Cauchy distribution](https://en.wikipedia.org/wiki/Cauchy_distribution). *a* and *b* have the same meanings and default values as in d3.randomWeibull.

## randomLogistic(*a*, *b*) {#randomLogistic}

```js
d3.randomLogistic(0, 1)
```

[Examples](https://observablehq.com/@parcly-taxel/cauchy-and-logistic-distributions) · [Source](https://github.com/d3/d3-random/blob/main/src/logistic.js) · Returns a function for generating random numbers with a [logistic distribution](https://en.wikipedia.org/wiki/Logistic_distribution). *a* and *b* have the same meanings and default values as in d3.randomWeibull.

## randomPoisson(*lambda*) {#randomPoisson}

```js
d3.randomPoisson(400)
```

[Examples](https://observablehq.com/@parcly-taxel/the-poisson-distribution) · [Source](https://github.com/d3/d3-random/blob/main/src/poisson.js) · Returns a function for generating random numbers with a [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution) with mean *lambda*.

## *random*.source(*source*) {#random_source}

```js
const seed = 0.44871573888282423; // any number in [0, 1)
const random = d3.randomNormal.source(d3.randomLcg(seed))(0, 1);
random(); // -0.6253955998897069
```

[Examples](https://observablehq.com/@d3/random-source) · Returns the same type of function for generating random numbers but where the given random number generator *source* is used as the source of randomness instead of Math.random. The given random number generator must implement the same interface as Math.random and only return values in the range [0, 1). This is useful when a seeded random number generator is preferable to Math.random.

## randomLcg(*seed*) {#randomLcg}

```js
d3.randomLcg(42)
```

[Examples](https://observablehq.com/@d3/d3-randomlcg) · [Source](https://github.com/d3/d3-random/blob/main/src/lcg.js) · Returns a [linear congruential generator](https://en.wikipedia.org/wiki/Linear_congruential_generator); this function can be called repeatedly to obtain pseudorandom values well-distributed on the interval [0,1) and with a long period (up to 1 billion numbers), similar to Math.random. A *seed* can be specified as a real number in the interval [0,1) or as any integer. In the latter case, only the lower 32 bits are considered. Two generators instanced with the same seed generate the same sequence, allowing to create reproducible pseudo-random experiments. If the *seed* is not specified, one is chosen using Math.random.
