import React from 'react';
import { View } from 'react-native';
import Svg, { 
  G, 
  Rect, 
  Polygon, 
  Line, 
  Circle, 
  Text, 
  Path 
} from 'react-native-svg';

interface MatrixPoint {
  value: number;
  locked?: boolean;
}

interface MatrixSVGProps {
  matrix: MatrixPoint[];
  width?: number;
  height?: number;
}

export default function MatrixSVG({ matrix, width = 340, height = 300 }: MatrixSVGProps) {
  return (
    <View style={{ width, height, alignItems: 'center', justifyContent: 'center' }}>
      <Svg viewBox="0 0 680 600" width={width} height={height}>
        <G id="matrix-frame">
          <Rect 
            stroke="#9c27b0" 
            strokeWidth="2" 
            fill="none" 
            x="163.63" 
            y="126.14" 
            width="340.16" 
            height="340.16" 
          />
          <Rect 
            stroke="#9c27b0" 
            strokeWidth="2" 
            fill="none" 
            x="227.87" 
            y="127.54" 
            width="340.16" 
            height="340.16" 
            transform="translate(-158.13 367.16) rotate(-45)" 
          />
          <Polygon 
            stroke="#9c27b0" 
            strokeWidth="2" 
            fill="none" 
            points="333.7,7.76 537.64,92.28 622.17,296.22 537.64,501.16 333.7,584.68 129.76,500.16 45.24,296.22 129.76,92.28" 
          />
          <Line 
            stroke="#666" 
            strokeWidth="1" 
            x1="333.7" 
            y1="27.76" 
            x2="333.7" 
            y2="564.68" 
          />
          <Line 
            stroke="#666" 
            strokeWidth="1" 
            x1="65.24" 
            y1="296.22" 
            x2="602.17" 
            y2="296.22" 
          />
          
          {/* Male generation line (green) */}
          <G>
            <Line 
              stroke="#4caf50" 
              strokeWidth="1.5" 
              x1="442" 
              y1="405" 
              x2="226" 
              y2="189" 
            />
            <Polygon 
              fill="#4caf50" 
              points="441,402 439,404 442,405" 
            />
            <Polygon 
              fill="#4caf50" 
              points="226,189 229,190 227,192" 
            />
          </G>
          
          {/* Female generation line (blue) */}
          <G>
            <Line 
              stroke="#2196f3" 
              strokeWidth="1.5" 
              x1="442" 
              y1="189" 
              x2="226" 
              y2="405" 
            />
            <Polygon 
              fill="#2196f3" 
              points="442,189 439,190 441,192" 
            />
            <Polygon 
              fill="#2196f3" 
              points="226,405 227,402 229,404" 
            />
          </G>
          
          <Line 
            stroke="#666" 
            strokeWidth="1" 
            x1="502" 
            y1="297" 
            x2="335" 
            y2="465" 
          />
          
          {/* Heart icon */}
          <G transform="translate(360, 370)">
            <Path 
              fill="#e91e63" 
              d="M13.5,0c-3.13,0-3.56,3-3.64,3s-0.71-3-3.62-3c-3.5,0-4.46,2.95-4.26,4.73c0.36,3.07,7.87,9.27,7.87,9.27s7.53-6.2,7.89-9.27C17.22,2.95,16.26,0,13.5,0Z" 
            />
          </G>
          
          {/* Dollar sign */}
          <G transform="translate(410, 345)">
            <Text 
              fill="#ffd700" 
              fontSize="24" 
              fontWeight="bold"
              x="0"
              y="0"
            >
              $
            </Text>
          </G>
        </G>
        
        <G id="points-basic">
          {/* A - День */}
          <Circle 
            fill="#2a2a3e" 
            stroke="#ffd700" 
            strokeWidth="2" 
            cx="79.2" 
            cy="297" 
            r="33.5" 
          />
          <Text 
            x="79.2" 
            y="302" 
            fontSize="18" 
            fontWeight="bold" 
            fill="#ffd700" 
            textAnchor="middle"
          >
            {matrix[1]?.value || 0}
          </Text>
          
          {/* B - Месяц */}
          <Circle 
            fill="#2a2a3e" 
            stroke="#ffd700" 
            strokeWidth="2" 
            cx="333.7" 
            cy="42" 
            r="33.5" 
          />
          <Text 
            x="333.7" 
            y="47" 
            fontSize="18" 
            fontWeight="bold" 
            fill="#ffd700" 
            textAnchor="middle"
          >
            {matrix[2]?.value || 0}
          </Text>
          
          {/* C - Год */}
          <Circle 
            fill="#2a2a3e" 
            stroke="#ff9800" 
            strokeWidth="2" 
            cx="587.13" 
            cy="297" 
            r="33.5" 
          />
          <Text 
            x="587.13" 
            y="302" 
            fontSize="18" 
            fontWeight="bold" 
            fill="#ffd700" 
            textAnchor="middle"
          >
            {matrix[3]?.value || 0}
          </Text>
          
          {/* D */}
          <Circle 
            fill="#2a2a3e" 
            stroke="#ff9800" 
            strokeWidth="2" 
            cx="332.7" 
            cy="554" 
            r="33.5" 
          />
          <Text 
            x="332.7" 
            y="559" 
            fontSize="18" 
            fontWeight="bold" 
            fill="#ffd700" 
            textAnchor="middle"
          >
            {matrix[4]?.value || 0}
          </Text>
          
          {/* E - Центр */}
          <Circle 
            fill="#1a1a2e" 
            stroke="#ffd700" 
            strokeWidth="3" 
            cx="334" 
            cy="297" 
            r="33.5" 
          />
          <Text 
            x="334" 
            y="302" 
            fontSize="20" 
            fontWeight="bold" 
            fill="#ffd700" 
            textAnchor="middle"
          >
            {matrix[0]?.value || 0}
          </Text>
          
          {/* F */}
          <Circle 
            fill="#2a2a3e" 
            stroke="#9c27b0" 
            strokeWidth="2" 
            cx="151" 
            cy="114.22" 
            r="33.5" 
          />
          <Text 
            x="151" 
            y="119" 
            fontSize="16" 
            fontWeight="bold" 
            fill="#ffd700" 
            textAnchor="middle"
          >
            {matrix[5]?.value || 0}
          </Text>
          
          {/* G */}
          <Circle 
            fill="#2a2a3e" 
            stroke="#9c27b0" 
            strokeWidth="2" 
            cx="515.1" 
            cy="114.22" 
            r="33.5" 
          />
          <Text 
            x="515.1" 
            y="119" 
            fontSize="16" 
            fontWeight="bold" 
            fill="#ffd700" 
            textAnchor="middle"
          >
            {matrix[6]?.value || 0}
          </Text>
          
          {/* I */}
          <Circle 
            fill="#2a2a3e" 
            stroke="#9c27b0" 
            strokeWidth="2" 
            cx="514.1" 
            cy="479.62" 
            r="33.5" 
          />
          <Text 
            x="514.1" 
            y="484" 
            fontSize="16" 
            fontWeight="bold" 
            fill="#ffd700" 
            textAnchor="middle"
          >
            {matrix[7]?.value || 0}
          </Text>
          
          {/* H */}
          <Circle 
            fill="#2a2a3e" 
            stroke="#9c27b0" 
            strokeWidth="2" 
            cx="153" 
            cy="479.62" 
            r="33.5" 
          />
          <Text 
            x="153" 
            y="484" 
            fontSize="16" 
            fontWeight="bold" 
            fill="#ffd700" 
            textAnchor="middle"
          >
            {matrix[8]?.value || 0}
          </Text>
          
          {/* Остальные точки с проверкой на существование */}
          {matrix[12] && (
            <>
              <Circle 
                fill="#2a2a3e" 
                stroke="#e91e63" 
                strokeWidth="2" 
                cx="332.59" 
                cy="466" 
                r="21" 
              />
              <Text 
                x="332.59" 
                y="470" 
                fontSize="14" 
                fontWeight="bold" 
                fill="#ffd700" 
                textAnchor="middle"
              >
                {matrix[12].value}
              </Text>
            </>
          )}
          
          {matrix[11] && (
            <>
              <Circle 
                fill="#2a2a3e" 
                stroke="#e91e63" 
                strokeWidth="2" 
                cx="500" 
                cy="297" 
                r="21" 
              />
              <Text 
                x="500" 
                y="301" 
                fontSize="14" 
                fontWeight="bold" 
                fill="#ffd700" 
                textAnchor="middle"
              >
                {matrix[11].value}
              </Text>
            </>
          )}
          
          {/* Добавляем остальные точки по мере необходимости */}
          {matrix[9] && (
            <>
              <Circle 
                fill="#2a2a3e" 
                stroke="#03a9f4" 
                strokeWidth="2" 
                cx="165.61" 
                cy="297" 
                r="21" 
              />
              <Text 
                x="165.61" 
                y="301" 
                fontSize="14" 
                fontWeight="bold" 
                fill="#ffd700" 
                textAnchor="middle"
              >
                {matrix[9].value}
              </Text>
            </>
          )}
          
          {matrix[10] && (
            <>
              <Circle 
                fill="#2a2a3e" 
                stroke="#03a9f4" 
                strokeWidth="2" 
                cx="333.7" 
                cy="129" 
                r="21" 
              />
              <Text 
                x="333.7" 
                y="133" 
                fontSize="14" 
                fontWeight="bold" 
                fill="#ffd700" 
                textAnchor="middle"
              >
                {matrix[10].value}
              </Text>
            </>
          )}
        </G>
      </Svg>
    </View>
  );
}