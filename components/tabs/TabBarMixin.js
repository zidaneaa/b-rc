
import React from 'react';
import classnames from 'classnames';

const tabBarExtraContentStyle = {
    float: 'right',
};

export default {
    getDefaultProps() {
        return {
            styles: {},
        };
    },
    onTabClick(key) {
        const { onTabClick } = this.props;
        onTabClick(key)
    },

    getTabs() {
        const { panels, activeKey, prefixCls } = this.props;
        const rst = [];
        React.Children.forEach(panels, child => {
            if (!child) {
                return;
            }
            const key = child.key;
            let cls = activeKey === key ? `${prefixCls}-tab-active` : '';
            cls += ` ${prefixCls}-tab`
            let events = {};
            if (child.props.disabled) {
                cls += ` ${prefixCls}-tab-disabled`;
            } else {
                events = {
                    onClick: () => this.onTabClick(key)
                };
            }
            const ref = {};
            if (activeKey === key) {
                ref.ref = 'activeTab';
            }

            rst.push(
                <div
                    role="tab"
                    aria-disabled={child.props.disabled ? 'true' : 'false'}
                    aria-selected={activeKey === key ? 'true' : 'false'}
                    {...events}
                    className={cls}
                    key={key}
                    {...ref}
                >
                    {child.props.tab}
                </div>
            )
        });

        return rst;
    },
    getRootNode(contents) {
        const { prefixCls, onKeyDown, className, extraContent, style } = this.props;
        const cls = classnames({
            [`${prefixCls}-bar`]: 1,
            [className]: !!className,
        });
        return (
            <div
                role="tablist"
                className={cls}
                tabIndex="0"
                ref="root"
                onKeyDown={onKeyDown}
                style={style}
            >
                {extraContent ?
                    (<div
                        style={tabBarExtraContentStyle}
                        key="extra"
                    >
                        {extraContent}
                    </div>) : null}
                {contents}
            </div>);
    },
}