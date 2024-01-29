const PostMeta = ({ date, authorName }) => {
	return (
		<div className="font-bold mb-2">
			<time className="text-brand-wild-blue" dateTime={ date || '' }>{ date || '' }</time>
			<span className="ml-2"><span className="italic mr-2">by</span>{ authorName || '' }</span>
		</div>
	);
}

export default PostMeta;
