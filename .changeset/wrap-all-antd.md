---
'@phanvanhieu/ui': minor
---

Export every antd component from the root, grouped by category (`general`, `layout`, `navigation`,
`data-entry`, `data-display`, `feedback`, `other`). Most are direct antd re-exports; new wrappers:
`Table` (default pagination), `Modal` (`centered`, `destroyOnHidden`) and `Upload` (`maxSize`,
`onReject`). `Form` now defaults to `layout="vertical"` and `scrollToFirstError`. `Select` and
`DatePicker` accept `required` (label marker). Added `Button.Group`, `Input.Group` and
`DatePicker.generatePicker`. The focus ring now follows `colorPrimary` instead of a fixed blue.
