import React, { Component }from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import DecIncControl from './DecIncControl'
export default class InputNumber extends Component {
  constructor (props) {
    super(props)
    this.toFixed = this.toFixed.bind(this)
    this.getPrecision = this.getPrecision.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.checkDecAvailable = this.checkDecAvailable.bind(this)
    this.checkIncAvailable = this.checkIncAvailable.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDec = this.handleDec.bind(this)
    this.handleInc = this.handleInc.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleWheel = this.handleWheel.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.state = {
      isFocused: false,
      value: props.defaultValue
    }
  }

  handleDec () {
    this.dec()
  }

  handleInc () {
    this.inc()
  }

  toFixed (value) {
    const old = this.getPrecision(this.state.value)
    const step = this.getPrecision(this.props.step)
    if (!old && !step) {
      return value
    }
    return value.toFixed(Math.max(old, step))
  }

  getPrecision (value) {
    const v = String(value)
    if (!/\./.test(v)) {
      return 0
    }
    return v.split('.')[1].length
  }

  handleChange (e) {
    this.updateValue(e.target.value)
  }

  updateValue (v) {
    const {disabled, onChange, min, max, precision} = this.props
    if (disabled || !onChange) {
      return
    }
    v = parseFloat(v)
    if (isNaN(v)) {
      return
    }
    if (min !== undefined && v < min) {
      v = min
    }
    if (max !== undefined && v > max) {
      v = max
    }
    v = precision > 0 ? parseFloat(this.toFixed(v)) : parseInt(this.toFixed(v))
    this.setState({
      value: v
    })
    onChange(v)
  }

  checkDecAvailable () {
    const {disabled, min} = this.props
    const {value} = this.state
    if (disabled) {
      return false
    }

    if (!Number.isInteger(min)) {
      return true
    }

    return value > min
  }

  checkIncAvailable () {
    const {disabled, max} = this.props
    const {value} = this.state
    if (disabled) {
      return false
    }

    if (!Number.isInteger(max)) {
      return true
    }

    return value < max
  }

  dec () {
    const {step, min} = this.props
    const {value} = this.state
    let v = value - step

    if (v < min) {
      v = min
    }

    this.updateValue(v)
  }

  inc () {
    const {step, max} = this.props
    const {value} = this.state
    let v = value + step

    if (v > max) {
      v = max
    }

    this.updateValue(v)
  }

  handleKeyDown (e) {
    const {min, max, step} = this.props
    const {value} = this.state
    if (e.key === 'ArrowDown') {
      this.dec()
    } else if (e.key === 'ArrowUp') {
      this.inc()
    } else if (e.key === 'End' && min !== undefined) {
      this.updateValue(min)
    } else if (e.key === 'Home' && max !== undefined) {
      this.updateValue(max)
    } else if (e.key === 'PageDown') {
      this.updateValue(value - (step * 10))
    } else if (e.key === 'PageUp') {
      this.updateValue(value + (step * 10))
    }
  }

  handleWheel (e) {
    if (!this.state.isFocused) {
      return
    }

    e.preventDefault()

    if (e.deltaY > 0) {
      this.dec()
    } else {
      this.inc()
    }
  }

  handleFocus () {
    this.setState({isFocused: true})
  }

  handleBlur () {
    this.setState({isFocused: false})
  }

  render () {
    const {className, size, prefixCls, min, max, disabled, name, readOnly} = this.props
    const inputNumberClass = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    }, className)
    const inputClass = classNames({
      [`${prefixCls}-input`]: true,
      [`${prefixCls}-input-focused`]: this.state.isFocused,
    })
    return (
      <div className={inputNumberClass}>
        <DecIncControl
          type="dec"
          onClick={this.handleDec}
          disabled={!this.checkDecAvailable()}
        />
        <div
          className={`${prefixCls}-input-wrap`}
          role="spinbutton"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={this.state.value}
        >
          <input
            className={inputClass}
            value={this.state.value}
            autoComplete="off"
            disabled={disabled}
            name={name}
            readOnly={readOnly}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onWheel={this.handleWheel}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </div>

        <DecIncControl
          type="inc"
          onClick={this.handleInc}
          disabled={!this.checkIncAvailable()}
        />
      </div>
    )
  }
}
InputNumber.defaultProps = {
  prefixCls: 'mff-input-number',
  disabled: false,
  step: 1,
  readOnly: false,
  precision: 0,
  onChange: () => {},
}
InputNumber.propTypes = {
  prefixCls: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  disabled: PropTypes.bool,
  defaultValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  className: PropTypes.string,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  precision: PropTypes.number,
  onChange: PropTypes.func,
}
