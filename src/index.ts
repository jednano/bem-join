const defaultOptions: IBEMJoinOptions = {
	elementSeparator: '__',
	modifierSeparator: '--',
}

export interface IBEMJoinOptions {
	/**
	 * The separator used between the BEM block and element name.
	 * The default is "__" (e.g., foo__bar).
	 */
	elementSeparator?: string
	/**
	 * The separator used between the BEM element and modifier names.
	 * The default is "--" (e.g., foo__bar--baz).
	 */
	modifierSeparator?: string
}

/**
 * Returns a function that can be used to construct BEM class names.
 */
function bemJoin(blockNameOrOptions: string | IBEMJoinOptions = {}) {
	return ((typeof blockNameOrOptions === 'string')
		? bemJoinOptions(defaultOptions)(blockNameOrOptions)
		: bemJoinOptions({
			...defaultOptions,
			...blockNameOrOptions,
		})
	// tslint:disable-next-line:no-any
	) as any

	function bemJoinOptions(options: IBEMJoinOptions) {
		return (blockName: string) => (
			blockModifiersOrElementName: IBEMModifiers | string,
			elementModifiers: IBEMModifiers = {},
		) => ((typeof blockModifiersOrElementName === 'string')
			? joinBEMModifiers(
				[
					blockName,
					blockModifiersOrElementName,
				].join(options.elementSeparator),
				elementModifiers,
				options.modifierSeparator,
			)
			: joinBEMModifiers(
				blockName,
				blockModifiersOrElementName,
				options.modifierSeparator,
			)
		).join(' ')

		function joinBEMModifiers(
			blockOrElement: string,
			modifiers: IBEMModifiers = {},
			separator?: string,
		) {
			return [blockOrElement]
				.concat(Object.keys(modifiers)
					.filter(m => modifiers[m])
					.map(m => [blockOrElement, m].join(separator)),
				)
		}
	}
}

export default bemJoin as CurryBlockName & CurryOptions

/**
 * BEM modifiers for blocks and elements.
 */
export interface IBEMModifiers {
	[modifierName: string]: boolean | undefined
}

export type CurryBlockName = (
	/**
	 * The BEM block name on the left side of each join.
	 */
	blockName: string,
) => IConstructClassNames

export interface IConstructClassNames {
	(
		/**
		 * If specified, the first class name returned will be the BEM block and
		 * element names joined (e.g., foo__bar).
		 */
		element: string,
		/**
		 * If specified, the last class names returned will be the joined BEM block
		 * and element followed by any number of modifiers provided (e.g., foo__bar--mod1 foo__bar--mod2)
		 */
		elementModifiers?: IBEMModifiers,
	): string
	(
		/**
		 * If specified, the last class names returned will be the BEM block name
		 * followed by any number of modifiers provided (e.g., foo--mod1 foo--mod2).
		 */
		blockModifiers?: IBEMModifiers,
	): string
}

export type CurryOptions = (options?: IBEMJoinOptions) => CurryBlockName
