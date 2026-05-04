import { useEffect, useRef } from "react";
import { BadgeCheck } from "lucide-react";
import type { Image } from "./types";

interface Props {
	image: Image;
	onClick: (image: Image) => void;
	isSelected?: boolean;
	done?: boolean;
	onToggleDone?: () => void;
}

const ImageCard = ({
	image,
	onClick,
	isSelected,
	done,
	onToggleDone,
}: Props) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isSelected && ref.current) {
			ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
		}
	}, [isSelected]);

	return (
		<div
			ref={ref}
			className={`border-2 overflow-hidden w-full bg-white ${isSelected ? "border-[var(--accent)]" : "border-[var(--border)]"}`}
		>
			<button
				type="button"
				className="cursor-pointer w-full"
				onClick={() => onClick(image)}
			>
				<img
					src={image.path}
					alt={image.title}
					className="w-full block bg-white"
				/>
			</button>
			<div className="px-3 pt-2 pb-0">
				<div className="flex items-start justify-between gap-2">
					<p className="text-lg font-medium text-gray-800 leading-tight">
						{image.title}
					</p>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onToggleDone?.();
						}}
						className="shrink-0 mt-1"
						aria-label="Toggle done"
					>
						<BadgeCheck
							size={18}
							className={
								done
									? "text-[var(--accent)]"
									: "text-[var(--foreground)]/20 hover:text-[var(--foreground)]/40"
							}
						/>
					</button>
				</div>
				<p className="text-sm text-gray-500">{image.createdAt}</p>
			</div>
		</div>
	);
};

export default ImageCard;
