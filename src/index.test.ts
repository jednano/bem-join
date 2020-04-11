import { bemJoin } from '.';
import type { BEMModifiers } from '.';

describe('bem-join', () => {
	it('exports a function named "bemJoin"', () => {
		expect(bemJoin.name).toBe('bemJoin');
	});

	it('calling bemJoin("foo")() returns "foo"', () => {
		expect(bemJoin('foo')()).toEqual('foo');
	});

	it('calling bemJoin("foo")({ bar: true }) returns "foo foo--bar"', () => {
		expect(bemJoin('foo')({ bar: true })).toEqual('foo foo--bar');
	});

	it('calling bemJoin("foo")({ bar: false }) returns "foo"', () => {
		expect(bemJoin('foo')({ bar: false })).toEqual('foo');
	});

	it('calling bemJoin("foo")({ bar: true, baz: false }) returns "foo foo--bar"', () => {
		expect(bemJoin('foo')({ bar: true, baz: false })).toEqual('foo foo--bar');
	});

	it('calling bemJoin("foo")("bar") returns "foo__bar"', () => {
		expect(bemJoin('foo')('bar')).toEqual('foo__bar');
	});

	it('calling bemJoin("foo")("bar", { baz: true }) returns "foo__bar foo__bar--baz"', () => {
		expect(bemJoin('foo')('bar', { baz: true })).toEqual(
			'foo__bar foo__bar--baz',
		);
	});

	it('calling bemJoin("foo")("bar", { baz: false }) returns "foo__bar"', () => {
		expect(bemJoin('foo')('bar', { baz: false })).toEqual('foo__bar');
	});

	it('calling bemJoin("foo")("bar", { baz: true, qux: false }) returns "foo__bar foo__bar--baz"', () => {
		expect(bemJoin('foo')('bar', { baz: true, qux: false })).toEqual(
			'foo__bar foo__bar--baz',
		);
	});

	it('calling bemJoin with nothing curries the default options', () => {
		expect(bemJoin()('foo')('bar', { baz: true })).toEqual(
			'foo__bar foo__bar--baz',
		);
	});

	it('calling bemJoin with options curries the options', () => {
		expect(
			bemJoin({
				elementSeparator: 'xx',
				modifierSeparator: 'yy',
			})('foo')('bar', { baz: true }),
		).toEqual('fooxxbar fooxxbaryybaz');
	});

	it('calling bemJoin with partial options uses default options for the missing ones', () => {
		expect(
			bemJoin({ elementSeparator: 'xx' })('foo')('bar', { baz: true }),
		).toEqual('fooxxbar fooxxbar--baz');
		expect(
			bemJoin({ modifierSeparator: 'yy' })('foo')('bar', { baz: true }),
		).toEqual('foo__bar foo__baryybaz');
	});
});

export interface TestModifiers extends BEMModifiers {
	foo: boolean;
	bar?: boolean;
	baz?: boolean;
}

export const testModifiers: TestModifiers = {
	bar: undefined,
	foo: true,
	// intentionally missing baz
};
