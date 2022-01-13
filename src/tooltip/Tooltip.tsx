import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popup from '../popup';
import useConfig from '../_util/useConfig';
import { TdTooltipProps } from './type';

export type TooltipProps = TdTooltipProps;

interface RefProps {
  setVisible: (v) => void;
}

const Tooltip = forwardRef<RefProps, TooltipProps>((props, ref) => {
  const {
    theme,
    showArrow = true,
    destroyOnClose = true,
    overlayClassName,
    children,
    duration = 0,
    ...restProps
  } = props;
  const { classPrefix } = useConfig();
  const [isTipShowed, setTipshow] = useState(duration !== 0);
  const [timeup, setTimeup] = useState(false);
  const popupRef = useRef<HTMLDivElement>();
  const toolTipClass = classNames(
    `${classPrefix}-tooltip`,
    {
      [`${classPrefix}-tooltip--${theme}`]: theme,
    },
    overlayClassName,
  );

  const setVisible = (v: boolean) => {
    if (duration !== 0) setTimeup(false);
    setTipshow(v);
  };

  const handleShowTip = (visible: boolean) => {
    if (duration === 0 || (duration !== 0 && timeup)) {
      setTipshow(visible);
    }
  };

  useEffect(() => {
    let timer;
    if (duration !== 0 && !timeup) {
      timer = setTimeout(() => {
        setTipshow(false);
        setTimeup(true);
      }, duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [duration, timeup]);

  useImperativeHandle(ref, () => ({
    setVisible,
  }));

  return (
    <>
      <Popup
        ref={popupRef}
        destroyOnClose={destroyOnClose}
        showArrow={showArrow}
        overlayClassName={toolTipClass}
        visible={isTipShowed}
        onVisibleChange={handleShowTip}
        {...restProps}
      >
        {children}
      </Popup>
    </>
  );
});

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  theme: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'warning', 'light']),
  showArrow: PropTypes.bool,
};
Tooltip.defaultProps = {
  theme: 'default',
  showArrow: true,
};
export default Tooltip;
