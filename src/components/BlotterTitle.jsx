function BlotterTitle({ as = 'h2', text, className = '' }) {
  const Tag = as

  return (
    <Tag
      className={`blotter-title ${className}`.trim()}
      aria-label={text}
    >
      <span className="blotter-title-text">{text}</span>
    </Tag>
  )
}

export default BlotterTitle
