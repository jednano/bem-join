import test from 'ava'

import bemBlock from './'

test('calling bemBlock("foo")() returns "foo"', t => {
	t.is(bemBlock('foo')(), 'foo')
})

test('calling bemBlock("foo")({ bar: true }) returns "foo foo--bar"', t => {
	t.is(
		bemBlock('foo')({ bar: true }),
		'foo foo--bar',
	)
})

test('calling bemBlock("foo")({ bar: false }) returns "foo"', t => {
	t.is(
		bemBlock('foo')({ bar: false }),
		'foo',
	)
})

test('calling bemBlock("foo")({ bar: true, baz: false }) returns "foo foo--bar"', t => {
	t.is(
		bemBlock('foo')({ bar: true, baz: false }),
		'foo foo--bar',
	)
})

test('calling bemBlock("foo")("bar") returns "foo__bar"', t => {
	t.is(
		bemBlock('foo')('bar'),
		'foo__bar',
	)
})

test('calling bemBlock("foo")("bar", { baz: true }) returns "foo__bar foo__bar--baz"', t => {
	t.is(
		bemBlock('foo')('bar', { baz: true }),
		'foo__bar foo__bar--baz',
	)
})

test('calling bemBlock("foo")("bar", { baz: false }) returns "foo__bar"', t => {
	t.is(
		bemBlock('foo')('bar', { baz: false }),
		'foo__bar',
	)
})

test('calling bemBlock("foo")("bar", { baz: true, qux: false }) returns "foo__bar foo__bar--baz"', t => {
	t.is(
		bemBlock('foo')('bar', { baz: true, qux: false }),
		'foo__bar foo__bar--baz',
	)
})

test('calling bemBlock with nothing curries the default options', t => {
	t.is(
		bemBlock()('foo')('bar', { baz: true }),
		'foo__bar foo__bar--baz',
	)
})

test('calling bemBlock with options curries the options', t => {
	t.is(
		bemBlock({
			elementSeparator: 'xx',
			modifierSeparator: 'yy',
		})('foo')('bar', { baz: true }),
		'fooxxbar fooxxbaryybaz',
	)
})

test('calling bemBlock with partial options uses default options for the missing ones', t => {
	t.is(
		bemBlock({ elementSeparator: 'xx' })('foo')('bar', { baz: true }),
		'fooxxbar fooxxbar--baz',
	)
	t.is(
		bemBlock({ modifierSeparator: 'yy' })('foo')('bar', { baz: true }),
		'foo__bar foo__baryybaz',
	)
})
