import test from 'ava'

import bemJoin, { BEMModifiers } from './'

test('calling bemJoin("foo")() returns "foo"', t => {
	t.is(bemJoin('foo')(), 'foo')
})

test('calling bemJoin("foo")({ bar: true }) returns "foo foo--bar"', t => {
	t.is(
		bemJoin('foo')({ bar: true }),
		'foo foo--bar',
	)
})

test('calling bemJoin("foo")({ bar: false }) returns "foo"', t => {
	t.is(
		bemJoin('foo')({ bar: false }),
		'foo',
	)
})

test('calling bemJoin("foo")({ bar: true, baz: false }) returns "foo foo--bar"', t => {
	t.is(
		bemJoin('foo')({ bar: true, baz: false }),
		'foo foo--bar',
	)
})

test('calling bemJoin("foo")("bar") returns "foo__bar"', t => {
	t.is(
		bemJoin('foo')('bar'),
		'foo__bar',
	)
})

test('calling bemJoin("foo")("bar", { baz: true }) returns "foo__bar foo__bar--baz"', t => {
	t.is(
		bemJoin('foo')('bar', { baz: true }),
		'foo__bar foo__bar--baz',
	)
})

test('calling bemJoin("foo")("bar", { baz: false }) returns "foo__bar"', t => {
	t.is(
		bemJoin('foo')('bar', { baz: false }),
		'foo__bar',
	)
})

test('calling bemJoin("foo")("bar", { baz: true, qux: false }) returns "foo__bar foo__bar--baz"', t => {
	t.is(
		bemJoin('foo')('bar', { baz: true, qux: false }),
		'foo__bar foo__bar--baz',
	)
})

test('calling bemJoin with nothing curries the default options', t => {
	t.is(
		bemJoin()('foo')('bar', { baz: true }),
		'foo__bar foo__bar--baz',
	)
})

test('calling bemJoin with options curries the options', t => {
	t.is(
		bemJoin({
			elementSeparator: 'xx',
			modifierSeparator: 'yy',
		})('foo')('bar', { baz: true }),
		'fooxxbar fooxxbaryybaz',
	)
})

test('calling bemJoin with partial options uses default options for the missing ones', t => {
	t.is(
		bemJoin({ elementSeparator: 'xx' })('foo')('bar', { baz: true }),
		'fooxxbar fooxxbar--baz',
	)
	t.is(
		bemJoin({ modifierSeparator: 'yy' })('foo')('bar', { baz: true }),
		'foo__bar foo__baryybaz',
	)
})

export interface TestModifiers extends BEMModifiers {
	foo: boolean
	bar?: boolean
	baz?: boolean
}

export const testModifiers: TestModifiers = {
	foo: true,
	bar: undefined,
	// intentionally missing baz
}
