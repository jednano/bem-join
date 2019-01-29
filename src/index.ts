const defaultOptions: BEMJoinOptions = {
	elementSeparator: '__',
	modifierSeparator: '--',
}

export interface BEMJoinOptions {
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
function bemJoin(blockNameOrOptions: string | BEMJoinOptions = {}) {
	return (typeof blockNameOrOptions === 'string'
		? bemJoinOptions(defaultOptions)(blockNameOrOptions)
		: bemJoinOptions({
				...defaultOptions,
				...blockNameOrOptions,
		  })) as any // tslint:disable-next-line:no-any

	function bemJoinOptions(options: BEMJoinOptions) {
		return (blockName: string) => (
			blockModifiersOrElementName: BEMModifiers | string,
			elementModifiers: BEMModifiers = {},
		) =>
			(typeof blockModifiersOrElementName === 'string'
				? joinBEMModifiers(
						[blockName, blockModifiersOrElementName].join(
							options.elementSeparator,
						),
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
			modifiers: BEMModifiers = {},
			separator?: string,
		) {
			return [blockOrElement].concat(
				Object.keys(modifiers)
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
export interface BEMModifiers {
	[modifierName: string]: boolean | undefined
}

export type CurryBlockName = (
	/**
	 * The BEM block name on the left side of each join.
	 */
	blockName: string,
) => ConstructClassNames

export interface ConstructClassNames {
	(
		/**
		 * If specified, the first class name returned will be the BEM block and element names joined (e.g., foo__bar).
		 */
		element: string,
		/**
		 * If specified, the last class names returned will be the joined BEM block and element followed by any number of modifiers provided (e.g., foo__bar--mod1 foo__bar--mod2)
		 */
		elementModifiers?: BEMModifiers,
	): string
	(
		/**
		 * If specified, the last class names returned will be the BEM block name followed by any number of modifiers provided (e.g., foo--mod1 foo--mod2).
		 */
		blockModifiers?: BEMModifiers,
	): string
}

export type CurryOptions = (options?: BEMJoinOptions) => CurryBlockName

// @ts-ignore
module.exports = Object.assign(exports.default, exports)
