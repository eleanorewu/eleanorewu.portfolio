import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface DotTextBackgroundProps {
  text: string | string[]; // 支援單行或兩行文字
  containerRef: React.RefObject<HTMLElement>;
  theme: 'light' | 'dark';
}

const DotTextBackground: React.FC<DotTextBackgroundProps> = ({ text, containerRef, theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 視差滾動效果：背景文字移動速度比前景慢
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 視差效果：背景文字向上移動，速度比前景慢（更明顯的視差效果）
  // 參考網站中，背景文字移動速度明顯慢於前景
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.9, 0.4]);
  
  // 進場動畫狀態
  const [isVisible, setIsVisible] = React.useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = dimensions.width;
    const height = dimensions.height;

    // 設置畫布尺寸
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // 繪製點狀文字
    const drawDotText = () => {
      // 清除畫布並確保背景透明
      ctx.clearRect(0, 0, width, height);

      const fontFamily = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
      
      // 計算合適的字體大小，最大寬度為 1280px（但不超過畫面寬度）
      const isMobile = width < 768; // md breakpoint
      const maxTextWidthRatio = isMobile ? 0.85 : 0.6;
      const maxTextWidth = Math.min(1280, width * maxTextWidthRatio);
      
      // 先使用一個初始字體大小來測量文字寬度
      // 桌機版使用更大的字體倍數和最大限制
      const fontSizeMultiplier = isMobile ? 0.12 : 0.15;
      const maxFontSize = isMobile ? 150 : 243; // 桌機版放大1.35倍，所以180 * 1.35 = 243
      let fontSize = Math.max(36, Math.min(maxFontSize, width * fontSizeMultiplier));
      
      // 桌機版將字體大小放大1.35倍
      if (!isMobile) {
        fontSize = fontSize * 1.35;
        // 確保不超過最大字體大小
        fontSize = Math.min(fontSize, maxFontSize);
      }
      
      // 創建臨時 context 來測量文字寬度
      const measureCtx = document.createElement('canvas').getContext('2d');
      if (measureCtx) {
        measureCtx.font = `bold ${fontSize}px ${fontFamily}`;
        
        // 測量所有文字行的寬度，找出最寬的那一行
        const textLines = Array.isArray(text) ? text : [text];
        let maxLineWidth = 0;
        
        textLines.forEach(line => {
          const metrics = measureCtx.measureText(line);
          maxLineWidth = Math.max(maxLineWidth, metrics.width);
        });
        
        // 如果文字寬度超過限制，按比例縮小字體大小
        if (maxLineWidth > maxTextWidth) {
          fontSize = (fontSize * maxTextWidth) / maxLineWidth;
          // 確保字體大小在合理範圍內
          fontSize = Math.max(36, Math.min(fontSize, maxFontSize));
        }
      }
      
      // 創建臨時畫布來繪製文字
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d', { alpha: true });
      if (!tempCtx) return;

      // 設置臨時畫布尺寸（稍大一些以確保文字完整）
      const tempWidth = width * 1.5;
      const tempHeight = height * 1.5;
      tempCanvas.width = tempWidth * dpr;
      tempCanvas.height = tempHeight * dpr;
      tempCtx.scale(dpr, dpr);

      // 根據主題選擇顏色 - 淺色模式用深色點，深色模式用淺色點
      // 參考網站：淺色背景上使用深灰色點，深色背景上使用淺灰色點
      const dotColor = theme === 'dark' ? '#A99CFB' : '#7E71D4'; // 深色模式用淺灰，淺色模式用深灰
      
      // 在臨時畫布上繪製文字（支援單行或兩行）
      tempCtx.font = `bold ${fontSize}px ${fontFamily}`;
      tempCtx.textAlign = 'center';
      tempCtx.fillStyle = dotColor;
      
      if (Array.isArray(text)) {
        // 兩行文字 - 垂直水平都置中，根據螢幕大小調整往上移動的距離
        const lineHeight = fontSize * 1.15; // 稍微緊湊的行距
        const totalHeight = lineHeight * (text.length - 1) + fontSize;
        // 垂直置中：計算總高度後，從中心位置開始繪製
        // 手機版往上移動132px，桌機版往上移動150px
        const isMobile = width < 768; // md breakpoint
        const verticalOffset = isMobile ? 132 : 150;
        const centerY = tempHeight / 2;
        const startY = centerY - totalHeight / 2 + fontSize - verticalOffset;
        
        text.forEach((line, index) => {
          tempCtx.textBaseline = 'alphabetic';
          tempCtx.fillText(line, tempWidth / 2, startY + index * lineHeight);
        });
      } else {
        // 單行文字 - 垂直水平都置中，根據螢幕大小調整往上移動的距離
        const isMobile = width < 768; // md breakpoint
        const verticalOffset = isMobile ? 132 : 150;
        tempCtx.textBaseline = 'middle';
        tempCtx.fillText(text, tempWidth / 2, tempHeight / 2 - verticalOffset);
      }

      // 獲取文字像素數據
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imageData.data;

      // 點的大小和間距 - 調整為更細密的點，符合參考網站效果
      // 點的大小約 1.5-2.5px，間距約 2.5-3.5px
      const dotSize = Math.max(1.5, Math.min(2.5, width / 500));
      const dotSpacing = Math.max(2.5, Math.min(3.5, width / 400));

      // 在主畫布上繪製點（使用與文字相同的顏色）
      ctx.fillStyle = dotColor;
      
      const startX = (width - tempWidth) / 2;
      const startY = (height - tempHeight) / 2;

      for (let py = 0; py < tempHeight; py += dotSpacing) {
        for (let px = 0; px < tempWidth; px += dotSpacing) {
          const pixelX = Math.floor(px * dpr);
          const pixelY = Math.floor(py * dpr);
          
          if (pixelX >= 0 && pixelX < tempCanvas.width && pixelY >= 0 && pixelY < tempCanvas.height) {
            const index = (pixelY * tempCanvas.width + pixelX) * 4;
            const alpha = data[index + 3]; // 獲取 alpha 通道

            // 如果像素不透明，繪製一個點
            if (alpha > 100) {
              ctx.beginPath();
              ctx.arc(
                startX + px,
                startY + py,
                dotSize / 2,
                0,
                Math.PI * 2
              );
              ctx.fill();
            }
          }
        }
      }
    };

    drawDotText();
  }, [text, dimensions, theme]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -35 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -35 }}
      transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <motion.div
        ref={wrapperRef}
        style={{
          y: parallaxY,
          opacity: parallaxOpacity,
          width: '100%',
          height: '100%'
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block'
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default DotTextBackground;
