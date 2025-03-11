import {styled} from '@mui/material/styles';
import {keyframes} from '@emotion/react';
import React from "react";

const jumpAnimation = keyframes`
    0%, 100% {
        transform: translateY(0) scale(1);
    }
    25% {
        transform: translateY(-20px) scale(0.8);
    }
    50% {
        transform: translateY(0) scale(1.2);
    }
    75% {
        transform: translateY(-10px) scale(1);
    }
`;

const smallJumpAnimation = keyframes`
    0%, 100% {
        transform: translateY(0) scale(1);
    }
    25% {
        transform: translateY(-10px) scale(0.8);
    }
    50% {
        transform: translateY(0) scale(1.2);
    }
    75% {
        transform: translateY(-5px) scale(1);
    }
`;

// const LoadingContainer =
//     styled('div')({
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         gap: '12px',
//         padding: '24px',
//     });

const LoadingContainer =
    styled('div')<{ large: boolean }>(({large}) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: large ? '12px' : '6px',
        padding: large ? '24px' : '12px',
    }));

const JumpingCircle = styled('div')<{ delay: number; large: boolean }>(({delay, large}) => ({
    width: large ? '24px' : '12px',
    height: large ? '24px' : '12px',
    borderRadius: '50%',
    animation: `${large ? jumpAnimation : smallJumpAnimation} 1.5s ease-in-out infinite`,
    animationDelay: `${delay}s`,

    // Different colors for each circle
    ':nth-of-type(1)': {backgroundColor: 'var(--primary-color)'},
    ':nth-of-type(2)': {backgroundColor: 'var(--danger-color)'},
    ':nth-of-type(3)': {backgroundColor: 'var(--success-color)'},
    ':nth-of-type(4)': {backgroundColor: 'var(--warning-color)'},
}));

interface LoadingProps {
    large?: boolean
}

export const Loading: React.FC<LoadingProps> = ({large = true}) => {
    return (
        <LoadingContainer large={large}>
            <JumpingCircle delay={0} large={large}/>
            <JumpingCircle delay={0.2} large={large}/>
            <JumpingCircle delay={0.4} large={large}/>
            <JumpingCircle delay={0.6} large={large}/>
        </LoadingContainer>
    );
};