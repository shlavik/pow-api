import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

export type CellAlign = 'left' | 'center' | 'right'

function getAlignmentFromStyle(element: HTMLElement, defaultAlign: CellAlign = 'left'): CellAlign {
	const style = element.getAttribute('style')
	if (!style) return defaultAlign
	const textAlignMatch = style.match(/text-align:\s*(\w+)/i)
	if (textAlignMatch && textAlignMatch[1]) {
		const align = textAlignMatch[1].toLowerCase()
		if (align === 'left' || align === 'center' || align === 'right') {
			return align as CellAlign
		}
	}
	return defaultAlign
}

const CustomTableHeader = TableHeader.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			align: {
				default: 'left',
				parseHTML: (element) => {
					// Сначала проверяем атрибут align, затем стиль text-align
					return element.getAttribute('align') || getAlignmentFromStyle(element)
				},
				renderHTML: (attributes) => {
					return {
						align: attributes.align,
						style: `text-align: ${attributes.align}`,
					}
				},
			},
		}
	},
})

const CustomTableCell = TableCell.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			align: {
				default: 'left',
				parseHTML: (element) => {
					// Сначала проверяем атрибут align, затем стиль text-align
					return element.getAttribute('align') || getAlignmentFromStyle(element)
				},
				renderHTML: (attributes) => {
					return {
						align: attributes.align,
						style: `text-align: ${attributes.align}`,
					}
				},
			},
		}
	},
})

export default {
	Table,
	TableHeader: CustomTableHeader,
	TableCell: CustomTableCell,
	TableRow,
}
