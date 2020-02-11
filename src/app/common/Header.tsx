import * as React from 'react';
import { handleCanvasVague } from '../../utils/util';

const { useEffect, useRef } = React;

const Header: React.FunctionComponent = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const logoEl: HTMLCanvasElement = canvasRef.current;
        const context: CanvasRenderingContext2D = logoEl.getContext('2d');
        handleCanvasVague(context, logoEl);
        context.textAlign = 'center';
        context.font = 'bold 50px Georgia, serif';
        let gradient = context.createLinearGradient(0, 0, 400, 120);
        gradient.addColorStop(0, '#60FF70');
        gradient.addColorStop(1, '#9850FF');
        context.fillStyle = gradient;
        context.fillText('Gluttonous Snake', Math.round(logoEl.offsetWidth / 2), logoEl.offsetHeight / 1.2);
        context.fill();
        // context.beginPath();
        // context.fillStyle = '#fff';
        // context.arc(10, 10, 10, 0, 2 * Math.PI);
        // context.fill();
        // context.closePath();
        // context.setTransform(1, 0, 0, 1, 0, 0);
    }, []);

    return (
        <>
            <div className='flex-center'>
                <canvas ref={canvasRef} id='logo' width='500' height='120' />
            </div>
        </>
    );
};

export default Header;
