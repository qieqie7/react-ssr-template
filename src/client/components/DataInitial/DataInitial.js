import React, { Component } from 'react';
import { isClientInitial, setClientInitial } from '../../utils/isClientInitial';

export default SourceComponent => {
    return class Hoc extends Component {
        constructor(props) {
            super(props);

            this.state = {
                initialData: {},
            };
        }

        static async getInitialProps(ctx) {
            return SourceComponent.getInitialProps ? await SourceComponent.getInitialProps(ctx) : {};
        }

        async getInitialProps() {
            const { match, location } = this.props;
            const res = await Hoc.getInitialProps({ match, location });
            this.setState({ initialData: res });

            let { tdk } = res.page;
            if (tdk) {
                document.title = tdk.title;
            }
        }

        async componentDidMount() {
            console.log(isClientInitial());
            if (isClientInitial()) {
                //需要异步请求数据
                await this.getInitialProps();
            } else {
                this.setState({ initialData: window.__initialData__ });
                setClientInitial(true);
            }
        }

        render() {
            const props = {
                ...this.props,
            };

            if (__SERVER__) {
                //服务端渲染
                props.initialData = this.props.staticContext.initialData || {};
            } else {
                props.initialData = this.state.initialData || {};
            }

            return <SourceComponent {...props} />;
        }
    };
};
