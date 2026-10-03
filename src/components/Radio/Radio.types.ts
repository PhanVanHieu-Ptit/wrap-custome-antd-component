import type { RadioProps as AntRadioProps, GetRef } from 'antd';
import type { Radio as AntRadio } from 'antd';

/** Ref target of antd Radio — keeps `focus()`, `blur()`, `nativeElement`. */
export type RadioRef = GetRef<typeof AntRadio>;

/** Thin wrapper: same props as antd's Radio. */
export type RadioProps = AntRadioProps;
