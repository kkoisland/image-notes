import { X } from "lucide-react";
import type { Image, ImageNote } from "./types";

interface Props {
	image: Image;
	onClose: () => void;
	note: ImageNote;
	onNoteChange: (note: ImageNote) => void;
}

const DetailView = ({ image, onClose, note, onNoteChange }: Props) => {
	return (
		<div className="h-full flex flex-col bg-[var(--background)]">
			<div className="flex justify-between items-center p-4 border-b-2 border-[var(--border)]">
				<div>
					<p className="text-lg font-medium text-[var(--foreground)]">
						{image.title}
					</p>
					<p className="text-sm text-[var(--foreground)]/60">
						{image.createdAt}
					</p>
				</div>
				<button
					type="button"
					onClick={onClose}
					className="text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
					aria-label="Close"
				>
					<X size={20} />
				</button>
			</div>
			<div className="flex-1 overflow-auto p-4">
				<img src={image.path} alt={image.title} className="w-full bg-white" />
			</div>
			<div className="border-t-2 border-[var(--border)] p-4 flex flex-col gap-3">
				<textarea
					placeholder="Memo"
					rows={3}
					value={note.memo}
					onChange={(e) => onNoteChange({ ...note, memo: e.target.value })}
					className="w-full text-sm bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] rounded-xl p-2 resize-none focus:outline-none focus:border-[var(--accent)]"
				/>
				<label className="flex items-center gap-2 text-sm text-[var(--foreground)] cursor-pointer">
					<input
						type="checkbox"
						checked={note.done}
						onChange={(e) => onNoteChange({ ...note, done: e.target.checked })}
						className="accent-[var(--accent)]"
					/>
					Done
				</label>
			</div>
		</div>
	);
};

export default DetailView;
