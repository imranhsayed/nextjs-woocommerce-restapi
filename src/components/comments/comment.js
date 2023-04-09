import { isEmpty } from 'lodash';
import { getFormattedDate, sanitize } from '../../utils/miscellaneous';
import Image from '../image';

const Comment = ( { comment, handleReplyButtonClick } ) => {
	
	if ( isEmpty( comment ) ) {
		return null;
	}
	
	return (
		<article className="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
			<footer className="flex justify-between items-center mb-4">
				<div className="flex items-center">
					<div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
						<Image
							sourceUrl={ comment?.author_avatar_urls?.['48'] ?? '' }
							title={ comment?.author_name ?? '' }
							width="24"
							height="24"
							layout="fill"
							containerClassNames="mr-2 w-9 h-9"
							style={{borderRadius: '50%', overflow: 'hidden'}}
						/>
						{ comment?.author_name ?? '' }
					</div>
					<div className="text-sm text-gray-600 dark:text-gray-400">
						<time dateTime={ comment?.date ?? '' } title="March 12th, 2022">{ getFormattedDate( comment?.date ?? '' ) }</time>
					</div>
				</div>
			</footer>
			<div
				className="text-gray-500 dark:text-gray-400"
				dangerouslySetInnerHTML={ { __html: sanitize( comment?.content?.rendered ?? '' ) } }
			/>
			<div className="flex items-center mt-4 space-x-4">
				<button
					type="button"
				    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
					onClick={ ( event ) => handleReplyButtonClick( event, comment.id ) }
				>
					<svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor"
					     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
						      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
						</path>
					</svg>
					Reply
				</button>
			</div>
		</article>
	)
}

export default Comment;
