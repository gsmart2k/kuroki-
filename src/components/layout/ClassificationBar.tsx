/** Vermilion classification bar with diamond ornaments */
export default function ClassificationBar() {
  return (
    <div className="classification-bar flex items-center justify-center gap-4 py-2 px-6 my-6">
      <span className="text-parchment-light text-sm font-cinzel tracking-[0.15em] uppercase select-none">
        ◆
      </span>
      <span className="font-cinzel text-[11px] md:text-xs tracking-[0.35em] uppercase text-parchment-light font-semibold">
        CLASSIFICATION&nbsp;:&nbsp;SEALED
      </span>
      <span className="font-mincho text-xs text-parchment/70 tracking-widest" lang="ja">
        機密指定
      </span>
      <span className="text-parchment-light text-sm font-cinzel tracking-[0.15em] select-none">
        ◆
      </span>
    </div>
  );
}
