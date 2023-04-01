const PostMeta = ({ post }) => {
	return (
		<div className="font-bold mb-2">
			<time className="text-brand-wild-blue" dateTime={ post?.date ?? '' }>{ post?.date ?? '' }</time>
			<span className="ml-2"><span className="italic mr-2">by</span>{ post?.meta?.author_name ?? '' }</span>
		</div>
	);
}

export default PostMeta;
