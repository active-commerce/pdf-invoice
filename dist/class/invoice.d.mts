interface CompanyInfo {
	logo?: string;
	name: string;
	address?: string;
	phone?: string;
	email?: string;
	website?: string;
}

interface CustomerInfo {
	name: string;
	address?: string;
	phone?: string;
	email?: string;
}

interface InvoiceInfo {
	label?: string;
	number: string | number;
	date: string;
	dueDate?: string;
	status: string;
	path: string;
	currency?: string;
}

interface ItemInfo {
	name: string;
	quantity: number;
	price: number;
	tax?: number;
}

interface QRInfo {
	data: string;
	width?: number;
}

type Notes = string;

interface InvoicePayLoad {
	company: CompanyInfo;
	customer: CustomerInfo;
	invoice: InvoiceInfo;
	items: ItemInfo[];
	qr: QRInfo;
	note: Notes;
}

interface SimplePDFInvoice {
	create(): Promise<string>;
	fonts(): any;
	meta(): any;
	content(): any;
	defaultStyle(): any;
	styles(): any;
}

declare class PDFInvoice implements SimplePDFInvoice {
    payload: InvoicePayLoad;
    company: CompanyInfo;
    invoice: InvoiceInfo;
    customer: CustomerInfo;
    items: ItemInfo[];
    currency: string;
    path: string;
    qr: QRInfo;
    note: Notes;
    date: string;
    constructor(payload: InvoicePayLoad);
    /**
     * Create a PDF invoice.
     *
     * @returns {void}
     * @since 1.0.0
     */
    create(): Promise<string>;
    /**
     * Fonts.
     *
     * @returns {Object} font.
     * @since 1.0.0
     */
    fonts(): any;
    /**
     * Doc meta.
     *
     * @returns {Object} meta.
     * @since 1.0.0
     */
    meta(): any;
    /**
     * Default invoice styles.
     *
     * @returns {Object} defaults.
     * @since 1.0.0
     */
    defaultStyle(): any;
    /**
     * Invoice styles.
     *
     * @returns {Object} defaults.
     * @since 1.0.0
     */
    styles(): any;
    /**
     * Return the invoice layout.
     *
     * @returns {Object} layout.
     * @since 1.0.0
     */
    content(): any;
}

export { PDFInvoice };
