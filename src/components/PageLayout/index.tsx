import React, { FC, ReactNode } from 'react'
import * as s from './style';

export interface Props {
    children:ReactNode;
}

const PageLayout:FC<Props> = ({children}) => {
    return (
        <div>
            <s.Header>
                <h1>JAM Stack Todo</h1>
            </s.Header>
            <s.Wrapper>
                {children}
            </s.Wrapper>
        </div>
    )
}

export default PageLayout
