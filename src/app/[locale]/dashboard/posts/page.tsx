import { SearchParams } from "@/types"
import { getPosts } from "@/lib/queries/post"
import { PostTable } from "@/components/posts-table/posts-table"
import { Header } from "@/components/header"
import { PostCreateButton } from "@/components/post/post-create-button"
import { getScopedI18n } from "@/lib/i18n/server"

export const metadata = {
  title: "Posts",
}

export interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export default async function PostsPage(props: IndexPageProps) {
  const searchParams = await props.searchParams;
  const t = await getScopedI18n('posts');
  const postsPromise = getPosts(searchParams)

  return (
    <>
      <Header heading={t('heading')} text={t('headingDescription')}>
        <PostCreateButton />
      </Header>
      <PostTable postPromise={postsPromise} />
    </>
  )
}
