/**
 * @file
 * @copyright 2023 itsmeow
 * @license MIT
 */

import { colord, HsvColor } from 'colord';
import { useState } from 'react';

import { useBackend } from '../backend';
import {
  Autofocus,
  Box,
  Flex,
  NumberInput,
  Section,
  Slider,
  Stack,
  Tooltip,
} from '../components';
import { Window } from '../layouts';
import { InputButtons } from './common/InputButtons';
import { Loader } from './common/Loader';

type ColorPickerData = {
  autofocus: boolean;
  buttons: string[];
  message: string;
  large_buttons: boolean;
  swapped_buttons: boolean;
  timeout: number;
  title: string;
  default_color: string;
};

export const ColorPickerModal = (_) => {
  const { data } = useBackend<ColorPickerData>();
  const {
    timeout,
    message,
    title,
    autofocus,
    default_color = '#000000',
  } = data;
  const initialColor = colord(default_color).toHsv();

  const [selectedColor, setSelectedColor] = useState(initialColor);

  return (
    <Window height={400} title={title} width={600} theme="generic">
      {!!timeout && <Loader value={timeout} />}
      <Window.Content>
        <Stack fill vertical>
          {message && (
            <Stack.Item m={1}>
              <Section fill>
                <Box color="label" overflow="hidden">
                  {message}
                </Box>
              </Section>
            </Stack.Item>
          )}
          <Stack.Item grow>
            <Section fill>
              {!!autofocus && <Autofocus />}
              <ColorSelector
                color={selectedColor}
                setColor={setSelectedColor}
                defaultColor={default_color}
              />
            </Section>
          </Stack.Item>
          <Stack.Item>
            <InputButtons input={colord(selectedColor).toHex()} />
          </Stack.Item>
        </Stack>
      </Window.Content>
    </Window>
  );
};

export const ColorSelector = ({
  color,
  setColor,
  defaultColor,
}: {
  color: HsvColor;
  setColor;
  defaultColor: string;
}) => {
  const handleChange = (params: Partial<HsvColor>) => {
    setColor((current: HsvColor) => {
      return Object.assign({}, current, params);
    });
  };
  const rgb = colord(color).toRgb();
  const hexColor = colord(color).toHex();
  return (
    <Flex direction="row">
      <Flex.Item mr={2}>
        <Stack vertical>
          <Stack.Item>
            <div className="react-colorful">
              <Slider name="huedidyaknow" onChange={handleChange} />
            </div>
          </Stack.Item>
          <Stack.Item>
            <Box inline width="100px" height="20px" textAlign="center">
              Current
            </Box>
            <Box inline width="100px" height="20px" textAlign="center">
              Previous
            </Box>
            <br />
            <Tooltip content={hexColor} position="bottom">
              <Box
                inline
                width="100px"
                height="30px"
                backgroundColor={hexColor}
              />
            </Tooltip>
            <Tooltip content={defaultColor} position="bottom">
              <Box
                inline
                width="100px"
                height="30px"
                backgroundColor={defaultColor}
              />
            </Tooltip>
          </Stack.Item>
        </Stack>
      </Flex.Item>
      <Flex.Item grow fontSize="15px" lineHeight="24px">
        <Stack vertical>
          <Stack.Item>
            <Stack>
              <Stack.Item>
                <Box textColor="label">Hex:</Box>
              </Stack.Item>
              <Stack.Item grow height="24px">
                {/* <ColorSelector
                  color={colord(color).toHsv()}
                  defaultColor={colord('#00000').toHslString()}
                  setColor={undefined}
                /> */}
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Divider />
          <Stack.Item>
            <Stack>
              <Stack.Item width="25px">
                <Box textColor="label">H:</Box>
              </Stack.Item>
              <Stack.Item grow>
                <Slider name="Hugh" onChange={handleChange} hue={color.h}>
                  hi
                </Slider>
                {/* <Hue hue={color.h} onChange={handleChange} /> */}
              </Stack.Item>
              <Stack.Item>
                <TextSetter
                  value={color.h}
                  callback={(_, v) => handleChange({ h: v })}
                  max={360}
                  unit="°"
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Item>
            <Stack>
              <Stack.Item width="25px">
                <Box textColor="label">S:</Box>
              </Stack.Item>
              <Stack.Item grow>
                {/* <Saturation color={color} onChange={handleChange} /> */}
                <Slider name="saturatio" onChange={handleChange} color={color}>
                  hi
                </Slider>
              </Stack.Item>
              <Stack.Item>
                <TextSetter
                  value={color.s}
                  callback={(_, v) => handleChange({ s: v })}
                  unit="%"
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Item>
            <Stack>
              <Stack.Item width="25px">
                <Box textColor="label">V:</Box>
              </Stack.Item>
              <Stack.Item grow>
                <Slider color={color} onChange={handleChange} />
              </Stack.Item>
              <Stack.Item>
                <TextSetter
                  value={color.v}
                  callback={(_, v) => handleChange({ v: v })}
                  unit="%"
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Divider />
          <Stack.Item>
            <Stack>
              <Stack.Item width="25px">
                <Box textColor="label">R:</Box>
              </Stack.Item>
              <Stack.Item grow>
                <Slider color={color} onChange={handleChange} target="r" />
              </Stack.Item>
              <Stack.Item>
                <TextSetter
                  value={rgb.r}
                  callback={(_, v) => {
                    rgb.r = v;
                    handleChange(colord(rgb).toHsv());
                  }}
                  max={255}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Item>
            <Stack>
              <Stack.Item width="25px">
                <Box textColor="label">G:</Box>
              </Stack.Item>
              <Stack.Item grow>
                <Slider color={color} onChange={handleChange} target="g" />
              </Stack.Item>
              <Stack.Item>
                <TextSetter
                  value={rgb.g}
                  callback={(_, v) => {
                    rgb.g = v;
                    handleChange(colord(rgb).toHsv());
                  }}
                  max={255}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Item>
            <Stack>
              <Stack.Item width="25px">
                <Box textColor="label">B:</Box>
              </Stack.Item>
              <Stack.Item grow>
                <Slider color={color} onChange={handleChange} target="b" />
              </Stack.Item>
              <Stack.Item>
                <TextSetter
                  value={rgb.b}
                  callback={(_, v) => {
                    rgb.b = v;
                    handleChange(colord(rgb).toHsv());
                  }}
                  max={255}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </Flex.Item>
    </Flex>
  );
};

const TextSetter = ({
  value,
  callback,
  min = 0,
  max = 100,
  unit,
}: {
  value: number;
  callback: any;
  min?: number;
  max?: number;
  unit?: string;
}) => {
  return (
    <NumberInput
      width="70px"
      value={Math.round(value)}
      step={1}
      minValue={min}
      maxValue={max}
      onChange={callback}
      unit={unit}
    />
  );
};
