import React, { FC, ReactNode } from 'react'
import * as s from './style';

export interface Props {
    children: ReactNode;
}

const PageLayout: FC<Props> = ({ children }) => {
    return (
        <s.Wrapper>
            <s.Header>
                <h1>JAM Stack Todo</h1>
            </s.Header>
            <s.ChildWrapper>
                {children}
            </s.ChildWrapper>
        </s.Wrapper>
    )
};

export default PageLayout;
