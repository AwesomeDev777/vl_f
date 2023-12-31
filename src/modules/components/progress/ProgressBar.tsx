import React from 'react'
import classNames from 'classnames'
import { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { useBootstrapPrefix } from '../_prefix/PrefixProvider'
import { map } from '../_utilities/ElementChildren'
import { BsPrefixProps } from '../helpers'
import { Variant } from '../types'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement>, BsPrefixProps {
	min?: number
	now?: number
	max?: number
	label?: React.ReactNode
	visuallyHidden?: boolean
	striped?: boolean
	animated?: boolean
	variant?: ProgressBarVariant
	isChild?: boolean
	size?: 'lg' | 'sm'
}

export type ProgressBarVariant = Variant

const ROUND_PRECISION = 1000

/**
 * Validate that children, if any, are instances of `<ProgressBar>`.
 */
function onlyProgressBar(props: any, propName: string, componentName: string): Error | null {
	const children = props[propName]
	if (!children) {
		return null
	}

	let error: Error | null = null

	React.Children.forEach(children, (child) => {
		if (error) {
			return
		}

		/**
		 * Compare types in a way that works with libraries that patch and proxy
		 * components like react-hot-loader.
		 *
		 * see https://github.com/gaearon/react-hot-loader#checking-element-types
		 */
		const element = <ProgressBar />
		if (child.type === element.type) return

		const childType: any = child.type
		const childIdentifier = React.isValidElement(child) ? childType.displayName || childType.name || childType : child
		error = new Error(
			`Children of ${componentName} can contain only ProgressBar ` + `components. Found ${childIdentifier}.`
		)
	})

	return error
}

const propTypes = {
	/**
	 * Minimum value progress can begin from
	 */
	min: PropTypes.number,

	/**
	 * Current value of progress
	 */
	now: PropTypes.number,

	/**
	 * Maximum value progress can reach
	 */
	max: PropTypes.number,

	/**
	 * Show label that represents visual percentage.
	 * EG. 60%
	 */
	label: PropTypes.node,

	/**
	 * Hide's the label visually.
	 */
	visuallyHidden: PropTypes.bool,

	/**
	 * Uses a gradient to create a striped effect.
	 */
	striped: PropTypes.bool,

	/**
	 * Animate's the stripes from right to left
	 */
	animated: PropTypes.bool,

	/**
	 * @private
	 * @default 'progress-bar'
	 */
	bsPrefix: PropTypes.string,

	/**
	 * Sets the background class of the progress bar.
	 *
	 * @type ('success'|'danger'|'warning'|'info')
	 */
	variant: PropTypes.any,

	/**
	 * Child elements (only allows elements of type <ProgressBar />)
	 */
	children: onlyProgressBar,

	/**
	 * @private
	 */
	isChild: PropTypes.bool,
}

const defaultProps = {
	min: 0,
	max: 100,
	animated: false,
	isChild: false,
	visuallyHidden: false,
	striped: false,
}

function getPercentage(now: number = 0, min: number = 0, max: number = 100) {
	const percentage = ((now - min) / (max - min)) * 100
	return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION
}

function renderProgressBar(
	{
		min,
		now,
		max,
		label,
		visuallyHidden,
		striped,
		animated,
		className,
		style,
		variant,
		bsPrefix,
		...props
	}: ProgressBarProps,
	ref: React.RefObject<any>
) {
	return (
		<div
			ref={ref}
			{...props}
			role="progressbar"
			className={classNames(className, `${bsPrefix}-bar`, {
				[`bg-${variant}`]: variant,
				[`${bsPrefix}-bar-animated`]: animated,
				[`${bsPrefix}-bar-striped`]: animated || striped,
			})}
			style={{ width: `${getPercentage(now, min, max)}%`, ...style }}
			aria-valuenow={now}
			aria-valuemin={min}
			aria-valuemax={max}
		>
			{visuallyHidden ? <span className="visually-hidden">{label}</span> : label}
		</div>
	)
}

renderProgressBar.propTypes = propTypes

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
	({ isChild, ...props }: ProgressBarProps, ref) => {
		props.bsPrefix = useBootstrapPrefix(props.bsPrefix, 'progress')

		if (isChild) {
			return renderProgressBar(props, ref as React.RefObject<any>)
		}

		const {
			min,
			now,
			max,
			label,
			visuallyHidden,
			striped,
			animated,
			size,
			bsPrefix,
			variant,
			className,
			children,
			...wrapperProps
		} = props

		return (
			<div ref={ref} {...wrapperProps} className={classNames(className, bsPrefix, size && `${bsPrefix}-${size}`)}>
				{children
					? map(children as unknown as React.ReactChildren, (child) => cloneElement(child, { isChild: true }))
					: renderProgressBar(
							{
								min,
								now,
								max,
								label,
								visuallyHidden,
								striped,
								animated,
								bsPrefix,
								variant,
							},
							ref as React.RefObject<any>
					  )}
			</div>
		)
	}
)

ProgressBar.displayName = 'ProgressBar'
ProgressBar.propTypes = propTypes
ProgressBar.defaultProps = defaultProps

export default ProgressBar
