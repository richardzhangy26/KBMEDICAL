[在应用中打开](https://rsci.app.link/?%24canonical_url=https%3A%2F%2Fmedium.com%2Fp%2F62320d99004e&%7Efeature=LiOpenInAppButton&%7Echannel=ShowPostUnderCollection&source=---top_nav_layout_nav----------------------------------)

[](https://medium.com/?source=---top_nav_layout_nav----------------------------------)

[写文章](https://medium.com/new-story?source=---top_nav_layout_nav----------------------------------)

[](https://medium.com/search?source=---top_nav_layout_nav----------------------------------)

[](https://medium.com/me/notifications?source=---top_nav_layout_nav----------------------------------)

![CoderBit](https://miro.medium.com/v2/resize:fill:64:64/0*elMdd-lj1YjVnqzp)

顶级高亮

会员专属故事

迄今为止最好的RAG技术？Anthropic的上下文检索与混合检索
================================================================================

[![Lan Chu](https://miro.medium.com/v2/resize:fill:88:88/1*pAJJI_P00fODeuSrfmnbyg.png)](https://huonglanchu.medium.com/?source=post_page-----62320d99004e--------------------------------)
[![Level Up Coding](https://miro.medium.com/v2/resize:fill:48:48/1*5D9oYBd58pyjMkV_5-zXXQ.jpeg)](https://levelup.gitconnected.com/?source=post_page-----62320d99004e--------------------------------)

[Lan Chu](https://huonglanchu.medium.com/?source=post_page-----62320d99004e--------------------------------)

·

关注

发布于

[Level Up Coding](https://levelup.gitconnected.com/?source=post_page-----62320d99004e--------------------------------)

·

8分钟阅读

·

2024年10月1日

1.3K

11

聆听

分享

更多

结合上下文BM25与上下文嵌入可以极大地提高你的RAG系统。

![](https://miro.medium.com/v2/resize:fit:700/1*IfSn7ytBnj6UGsxsQNkPeQ.png)

使用上下文嵌入和上下文BM25的混合搜索。图像由作者提供。

RAG是老概念的新包装
================================================

RAG（检索增强生成）目前是一个热门话题，原因显而易见。通过让LLM（如Claude3.5）接入外部知识源，它为用户查询提供了额外的上下文，减少了幻觉的发生。这也帮助克服了语言模型的上下文限制。

但如果我们简单化一点，其实没什么特别的。  
想问LLM奥巴马的生日是什么？为什么不先找到奥巴马的维基百科页面（检索），把它添加到提示中（增强），让LLM回答问题（生成）。就这样！我们建立了第一个RAG系统。

在其核心，RAG系统有两个组件：一个从外部源文档中检索信息的检索器和一个使用检索到的信息生成响应的生成器。

![](https://miro.medium.com/v2/resize:fit:500/1*yhNrCt2gRVXYfk1YXKoVkg.png)

图像由作者提供

随着RAG的流行，RAG常常被认为等同于基于语义搜索或嵌入的索引构建。

其实，检索不仅仅是关于语义搜索或使用嵌入。这并不是RAG的新发明。信息检索技术已经有一个世纪的历史。过去，我们是如何检索相关文档的？答案是使用我们熟悉的BM25算法。这种简单、快速且有效的方法推动了许多搜索引擎的发展。

尽管RAG在减少幻觉方面表现出色，但它也面临挑战。传统RAG系统的一个关键问题是将文档拆分成较小的块进行检索时可能导致上下文的丢失。这正是Anthropic引入的一个简单概念——**“上下文检索”**，为在RAG框架内保持更广泛的上下文提供了解决方案。

上下文检索
====================

传统RAG通常将文档分割成较小的块以提高检索效率，但这可能导致上下文的丢失。

在最近的[论文](https://www.anthropic.com/news/contextual-retrieval)中，Anthropic提出了“上下文嵌入”的概念，通过在嵌入之前为每个块添加相关上下文来解决缺乏上下文的问题。

可以利用LLM进行上下文检索。你可以为LLM开发一个提示，指示模型基于整体文档生成简洁、块特定的上下文，以便为每个块提供上下文信息。

![](https://miro.medium.com/v2/resize:fit:700/1*OJspQxehTykRxihdMkpkQQ.png)

示例展示了如何通过添加更多上下文来转换块。来源：[Anthropic](https://www.anthropic.com/news/contextual-retrieval)

考虑一个关于某公司季度收入增长的查询。一个相关的块可能是这样的：“_公司的收入比上一季度增长了3%_”，其中包含增长百分比，但缺乏公司名称或时间段等重要细节。这种上下文的缺失可能会影响检索的准确性。

通过将整体文档发送给LLM以处理每个块，我们可以得到一个上下文化的块，如下所示：

![](https://miro.medium.com/v2/resize:fit:700/1*OYiABIrjAciHQtNl8U4tVQ.png)

示例展示了如何转换块。来源：[Anthropic](https://www.anthropic.com/news/contextual-retrieval)

这个“上下文化的块”然后被发送到嵌入模型中以创建块的嵌入。

混合搜索方法
======================

虽然这种上下文嵌入已被证明可以改善传统语义搜索RAG，但结合BM25的混合方法可以产生更好的结果。

相同的块特定上下文也可以与BM25搜索一起使用，以进一步提高检索性能。

Okapi BM25
----------

BM25是一种算法，解决了TF-IDF的一些缺陷，这些缺陷涉及术语饱和和文档长度。

**术语饱和和递减收益**

如果一个文档包含100次“计算机”一词，它真的比包含50次的文档相关性高两倍吗？我们可以说，如果“计算机”这个词出现的次数足够多，该文档几乎可以肯定是相关的，任何更多的出现不会增加相关性的可能性。因此，我们希望在术语很可能饱和时控制术语频率的贡献。BM25通过引入参数k1来解决这个问题，控制这种饱和曲线的形状。这使我们可以尝试不同的k1值，看看哪个值效果最好。

参数k1可以调节成这样：**当术语频率增加时，BM25分数将在某个点饱和**，这意味着术语频率的增加不再对分数贡献太多。

![](https://miro.medium.com/v2/resize:fit:445/1*8pXHVlpDWrQ4wiYhyszmKA.png)

使用参数k1的TF和BM25饱和曲线。图像由作者提供

**文档长度**

在TF-IDF中被忽略的另一个问题是文档长度。如果一个文档非常短并且它包含一次“计算机”，那可能已经是相关性的一个好指示。但如果文档非常长而且“计算机”只出现一次，那可能表明文档不是关于计算机的。我们希望对短文档中的术语匹配进行奖励，并惩罚长文档。

然而，你不希望过度惩罚，因为有时文档很长是因为它包含了很多相关信息而不是仅仅有很多词。我们如何实现这一点？我们将引入另一个参数b来平衡短文档和长文档的相关性。参数b控制惩罚的强度：b值越高，大文档的惩罚越高。相反，短于平均的文档会被奖励并获得更高的分数。语料库的平均长度被用作参考点。长文档是指比语料库的平均长度更长的文档，而短文档则更短。

![](https://miro.medium.com/v2/resize:fit:475/1*Hnt8oo_aluY_of9DCHO0RA.png)

使用参数b的文档长度和BM25分数。图像由作者提供。

虽然BM25是一个强大的基于术语的检索，但是它可能会因为无法捕获文档的语义意义而错过相关文档。这就是基于嵌入的检索发挥作用的地方。

基于嵌入的检索（密集检索）
-------------------------------------------

密集检索技术将文本转换为嵌入——这是一种表示文本（或图像、音频）的方法，通过一组数字来表示。嵌入通常是一个向量，旨在保留原始数据的重要属性。在搜索时，查询被嵌入到相同的向量空间，最接近查询嵌入的嵌入（块/文档）将通过比较这两个向量的接近程度来识别。

![](https://miro.medium.com/v2/resize:fit:700/0*N7x-Cn17Jb-GNY50.gif)

余弦相似度，利用两个向量之间的角度来判断它们的接近程度，是密集检索的一个流行度量。余弦相似度分数越高（意味着角度越小），与查询的语义重叠越高，因此语义意义越接近。

例如，“_The cat sits on a mat_”的嵌入应该比“_AI research is super fun_”更接近“_The dog plays on the grass_”，因为前两个句子共享更多的语义元素。

在实践中，向量搜索通常作为最近邻搜索实现。给定一个查询，目标是找到k个最相似的向量。一个直接的方法是k-最近邻（k-NN）算法：

1.  计算查询嵌入与所有存储向量之间的相似度分数，通常使用余弦相似度。
2.  根据相似度分数对这些向量进行排序。
3.  选择分数最高的前k个向量。

混合搜索：上下文BM25和上下文嵌入
--------------------------------------------------------

Anthropic还采用了一种混合方法，将上下文嵌入搜索和上下文BM25搜索的检索结果使用互惠等级合并以产生最终的排名分数。

![](https://miro.medium.com/v2/resize:fit:700/1*IfSn7ytBnj6UGsxsQNkPeQ.png)

使用上下文嵌入和上下文BM25的混合搜索。最终的相关分数如图所示。图像由作者提供。

这种混合方法的有效性还取决于在互惠等级过程中分配给语义搜索和BM25搜索结果的相对权重。这个相对权重允许你控制每种检索方法对最终排名的影响程度。

如果你选择语义搜索的较高权重和BM25的低权重，在语义搜索中表现良好的块（具有较高权重）可能在最终结果中排名较高。

例如，如果我们将BM25的权重设置为0.2，嵌入为0.8，那么嵌入排名第#20的项对最终分数的总贡献与BM25排名第#5的项相同。

然而，在BM25搜索中也表现良好的块会得到额外的提升。结合上下文嵌入和上下文BM25将前20个块的检索失败率减少了49%（5.7% → 2.9%）。

![](https://miro.medium.com/v2/resize:fit:700/0*iZG_WCCnSuk47IZz)

来源：[Anthropic](https://www.anthropic.com/news/contextual-retrieval)

RAG评估
==============

虽然RAG很棒，但它也可能对你造成巨大的反效果。

无论你的LLM有多好，如果你的搜索不好，你找不到相关的块，那么祝你好运找到正确的答案。

向上下文窗口添加更多内容并不总是改善结果。太多不相关的内容可能导致模型幻觉或遗忘信息（阅读“[迷失在中间](https://arxiv.org/abs/2307.03172)”的效果）。这就是为什么评估你的搜索和评估你的LLM一样重要。

Ragas是一个帮助你评估RAG管道的框架。其中两个指标（忠实度和答案相关性）侧重于评估生成质量，而以下两个指标评估搜索。

![](https://miro.medium.com/v2/resize:fit:646/1*T9Jz4UAmDK3PMbpPbZi05w.jpeg)

图像由作者提供。

*   上下文精度：在所有检索到的文档中，有多少百分比与查询相关？

这个指标评估生成答案时实际使用了多少检索到的内容。它将上下文与答案进行比较，以查看答案是否实际来自上下文。它告诉你添加更多上下文是否实际上有助于检索答案。因此，如果你获得了95%的准确性，但只有10%的上下文精度，那么添加更多上下文可能对提高答案质量没有用。目标是提供最精准、最相关的内容片段。

*   上下文召回：在所有与查询相关的文档中，有多少百分比被检索到？

这衡量是否所有回答问题所需的相关信息都存在于检索到的内容中。低上下文召回率表明需要改进你的搜索算法。

关于RAG评估的更多信息可以在[这里](https://docs.ragas.io/en/v0.0.17/concepts/metrics/context_precision.html)找到。

结论
==========

这种简单的上下文方法以及通过结合BM25和语义搜索的混合搜索似乎为RAG系统解锁了一个新的性能水平。如果你对使用上下文检索感兴趣，你可以通过Anthropic的[食谱](https://github.com/anthropics/anthropic-cookbook/tree/main/skills/contextual-embeddings)入门，看看它在实践中如何运作。

感谢阅读！
===================

我喜欢写关于数据科学概念的文章，并尝试不同的AI模型和数据科学工具。欢迎在[Medium](https://huonglanchu.medium.com/) 或 [LinkedIn](https://www.linkedin.com/in/lanchuhuong/) 上与我联系。

学习愉快 📚😊!

[检索增强生成](https://medium.com/tag/retrieval-augmented-gen?source=post_page-----62320d99004e--------------------------------)

[混合搜索](https://medium.com/tag/hybrid-search?source=post_page-----62320d99004e--------------------------------)

[LLM](https://medium.com/tag/llm?source=post_page-----62320d99004e--------------------------------)

[信息检索](https://medium.com/tag/information-retrieval?source=post_page-----62320d99004e--------------------------------)

1.3K

1.3K

11

[![Lan Chu](https://miro.medium.com/v2/resize:fill:144:144/1*pAJJI_P00fODeuSrfmnbyg.png)](https://huonglanchu.medium.com/?source=post_page-----62320d99004e--------------------------------)
[![Level Up Coding](https://miro.medium.com/v2/resize:fill:64:64/1*5D9oYBd58pyjMkV_5-zXXQ.jpeg)](https://levelup.gitconnected.com/?source=post_page-----62320d99004e--------------------------------)

关注

[由Lan Chu撰写\
------------------](https://huonglanchu.medium.com/?source=post_page-----62320d99004e--------------------------------)

[2.2K 关注者](https://huonglanchu.medium.com/followers?source=post_page-----62320d99004e--------------------------------)

·作者为

[Level Up Coding](https://levelup.gitconnected.com/?source=post_page-----62320d99004e--------------------------------)

数据科学家 | 写关于数据和AI的文章。🤝 LinkedIn [https://www.linkedin.com/in/lanchuhuong/](https://www.linkedin.com/in/lanchuhuong/)

关注

来自Lan Chu和Level Up Coding的更多内容
-------------------------------------

![2024年我用来提高生产力和创造力的工具](https://miro.medium.com/v2/resize:fit:679/1*DFDLQ2v-7qbMKikJ1wpnSQ.png)

[![Lan Chu](https://miro.medium.com/v2/resize:fill:20:20/1*pAJJI_P00fODeuSrfmnbyg.png)](https://huonglanchu.medium.com/?source=author_recirc-----62320d99004e----0---------------------8095f8d4_9946_4eea_a4d4_2c538e95bc0e-------)

[Lan Chu](https://huonglanchu.medium.com/?source=author_recirc-----62320d99004e----0---------------------8095f8d4_9946_4eea_a4d4_2c538e95bc0e-------)

在

[Level Up Coding](https://levelup.gitconnected.com/?source=author_recirc-----62320d99004e----0---------------------8095f8d4_9946_4eea_a4d4_2c538e95bc0e-------)

[2024年我用来提高生产力和创造力的工具\
-----------------------------------------------------\
\
### 这是我无法离开的工具列表。](/the-tools-i-use-to-be