import { Type, Size } from './type';

export function changeTypeToClassName(type) {
  switch (type) {
    case Type.PRIMARY: return 'rogu-button--primary';
    case Type.SECONDARY: return 'rogu-button--secondary';
    case Type.DANGER: return 'rogu-button--danger';
    case Type.DISABLED: return 'rogu-button--disabled';
    default: return null;
  }
}

export function changeSizeToClassName(size) {
  switch (size) {
    case Size.BIG: return 'rogu-button--big';
    case Size.SMALL: return 'rogu-button--small';
    default: return null;
  }
}
