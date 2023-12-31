import Layout from "../../components/layout";
import Head from "next/head";
import Date from "../../components/date";
import { getPostData, getAllPostIds } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export default function Post({data}){
    return (
        <Layout>
            <Head>
                <title>{data.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{data.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={data.date} />
                </div>
                <div dangerouslySetInnerHTML={{__html: data.contentHtml }} />
            </article>
        </Layout>
    )
}

export async function getStaticProps({params}){
    const data = await getPostData(params.id);
    return {
        props: {
            data,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}