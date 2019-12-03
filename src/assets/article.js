let content = `<div style="text-align:center"><img src="../storage/images/20181115-160119-962.jpg"><p></p><p></p></div>
<blockquote>
<p><em>本文来源于网络重新整理，原链接见文末</em></p>
</blockquote>
<h2><a id="_4"></a>什么是正则表达式?</h2>
<p>Regular Expression，简称 RE/Regex。用于匹配字符串中字符组合的模式。我们可以通过认识集合中有限的字符(正则表达式中的元字符)来识别属于这种集合的任意多的其他字符。<br />
这样来讲，其实你之前已经接触过正则了，只是你不知道而已。比如:</p>
<pre><code class="lang-">Ctrl + F
</code></pre>
<p>字符串子串匹配问题， 本质上也是正则。</p>
<pre><div class="hljs"><code class="lang-bash"><span class="hljs-built_in">echo</span> <span class="hljs-string">"shellvon"</span> | grep von
</code></div></pre>
<p>我们在命令行下经常使用的 grep，其实你的 von 也算正则了</p>
<h2><a id="_20"></a>基础用法</h2>
<p>上述 <code>grep</code> 是一种匹配方法，可是当我们要匹配的都是数字或者都是字母的时候。或者100个相同字母的时候，写起来就啰嗦复杂了。也谈不上模式！所以呢，我们引入了一种这样功能的字符: 自己不代表自己原本含义，而都有特殊含义的字符。比如，我希望点号 .可以匹配任意字符，具有这种功能的字符，称之为元字符(metacharacters)。</p>
<h3><a id="_23"></a>元字符</h3>
<p>我们有时候会用一些字符来表示\代替其他字符，比如用 <code>*</code> 代替脏话，类似的方式就需要用正则表达式来实现匹配查找替换显示，我们可以用有限数量的元字符来表示无限数量的字符。</p>
<table>
<thead>
<tr>
<th>元字符</th>
<th>表示含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>^与&amp;</td>
<td>(^)行的开始与行的结束(&amp;)</td>
</tr>
<tr>
<td>[]与[^]</td>
<td>字符组([])和排除字符组([^]) ^必须放在开始</td>
</tr>
<tr>
<td>-</td>
<td>连字符，必须放在字符组内，表示范围，如：[0-9]</td>
</tr>
<tr>
<td>.</td>
<td>匹配任意字符(可能会排除\n)</td>
</tr>
<tr>
<td>* 与 +</td>
<td>量词，匹配之前的字符出现次数， * &gt;= 0 次， + &gt;= 1 次</td>
</tr>
<tr>
<td>{n}与{n,}与{n,m}</td>
<td>区间量词，匹配次数，{n}匹配n次，{n,m}匹配 n~m 次</td>
</tr>
<tr>
<td>|</td>
<td>或者</td>
</tr>
<tr>
<td>?</td>
<td>量词，? 之前的字符为可选字符</td>
</tr>
<tr>
<td>()</td>
<td>字符集，完全匹配括号里的数据</td>
</tr>
<tr>
<td>\</td>
<td>转义字符，用来匹配一些特殊符号(如元字符，<code>\*</code> 表示匹配 <code>*</code> )</td>
</tr>
</tbody>
</table>
<p><em>注：<code>-</code> 连字符如果要表示区间，必须有起始，否则 <code>-</code> 只表示 <code>-</code> 字符本身，如 <code>[-1]</code> 表示 <code>-</code> 和 <code>1</code> 两个字符的合集，再如 <code>[0-5-7]</code> 表示 <code>0,1,2,3,4,5,-,7</code> 这几个字符的集</em></p>
<pre><div class="hljs"><code class="lang-php"><span class="hljs-string">"[Tt]he"</span> =&gt; The car parked in the garage
            ^^^               ^^^
<span class="hljs-string">"[^c]ar"</span> =&gt; The car parked in the garage
                    ^^^           ^^^
<span class="hljs-string">"c.+t"</span> =&gt; The fat cat sat on the mat
                  ^^^^^^^^^^^^^^^^^^
                   ¦----被(.+)匹配-¦
<span class="hljs-string">"b.g"</span> =&gt; baidugoogle big bug bag
                     ^^^ ^^^ ^^^
</code></div></pre>
<h3><a id="_53"></a>子表达式</h3>
<p>我们在实际的运算过程中，经常会碰到一些不能一次性表达的复杂算法，这时候就可以将复杂的表达式拆分为几组表达式来组成完整的范围，这些简单的表达式称之为 <strong>子表达式</strong>。它们通常用 <code>|</code> 符号来分隔或放在括号内包括起来。例如： <code>d(a|i)d</code> 用来表示 <code>dad</code> 或 <code>did</code>。</p>
<p>下面是一个思考题：如何用元字符表示 <code>0-23</code> 这个数字范围？初学者可能会直接想到 <code>[0-23]</code> 区间字符组不是刚好表示这个区间范围吗？很遗憾并不是，因为 <code>-</code> 连字符的开始和结束只能用一个字符来表示（16进制例外）。所以表达式 <code>[0-23]</code> 所表示的是 <code>[0123]</code> 这四个数字的范围。</p>
<p>这时候我们用子表达式的概念，将这个区间范围进行拆分就能比较方便的表达了。</p>
<p><code>[0-9]</code> 可以匹配0-9范围<br />
<code>1[0-9]</code> 可以匹配10-19范围<br />
<code>2[0-3]</code> 可以匹配20-23范围</p>
<p>最后用 <code>|</code> 符号连接 <code>[0-9]|1[0-9]|2[0-3]</code> 得到我们所要的表达式结果。</p>
<blockquote>
<p>如果更加复杂一点呢，比如要匹配一个 IPv4 地址呢？其实原理一样，只是数字范围变成了0-255。<br />
更为复杂的就是，考虑匹配一个日期，需要考虑月份和天数的关系，甚至还有闰年，<strong>通常这种时候你还要用正则的话，你估计已经开始过度使用正则了，你需要避免这样</strong>。</p>
</blockquote>
<h3><a id="_69"></a>常用简写</h3>
<p>有一些非常常用的表达式，如数字 <code>[0-9]</code> 或字母 <code>[a-z]</code>，为了写起来简便，有替代的简写用法帮助我们更好记忆更方便书写</p>
<table>
<thead>
<tr>
<th>简写字符</th>
<th>表示含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>.</td>
<td>表示任意字符</td>
</tr>
<tr>
<td>\d 和 \D</td>
<td>表示数字<code>\d</code>和非数字<code>\D</code></td>
</tr>
<tr>
<td>\w 和 \W</td>
<td><code>\w</code>表示<code>[a-zA-Z0-9]</code>，<code>\W</code>表示非这些字符</td>
</tr>
<tr>
<td>\s 和 \S</td>
<td><code>\s</code>表示匹配所有空格，<code>\S</code>表示非空格</td>
</tr>
</tbody>
</table>
<p>以下是几个例子：</p>
<pre><div class="hljs"><code class="lang-php"><span class="hljs-string">"\d{2,3}"</span> =&gt; The number was <span class="hljs-number">9.9997</span>.
                              ^^^
<span class="hljs-string">"car\sis"</span> =&gt; The car is parked.
                 ^^^^^^
<span class="hljs-string">"^\d+"</span> =&gt; <span class="hljs-number">13</span> is less than <span class="hljs-number">18.</span>
          ^^
</code></div></pre>
<p><em>以上末尾 <code>.</code> 仅表示结束，不属于匹配范围</em></p>
<h3><a id="_89"></a>捕获、非捕获和反向引用</h3>
<p>从上述子表达式中，我们知道括号表示一个整体，另外括号还有一个作用是 <strong>捕获</strong>。捕获的意思是我们在使用正则表达式去匹配的时候，正则引擎会记录我们匹配的结果，并取一个名字，方便我们在匹配完毕或匹配过程中需要使用这些结果的时候来进行引用。</p>
<blockquote>
<p>正则引擎的取名规则：每个括号对为一组，以左括号的出现顺序为顺序，从 1 开始，从左向右自动累加组号。</p>
</blockquote>
<p>例如： <code>(hello (world (regex)))</code> 的分组如下：</p>
<pre><code class="lang-">1. hello world regex &lt;-- 第一个组，组号为1，后面以此类推
2. world regex       &lt;-- 第二个组
3. regex              &lt;-- 第三个组
</code></pre>
<p>得到以上组号之后，我们便可以通过组号来使用匹配结果，这个方式叫 <strong>反向引用</strong>。<br />
例如：</p>
<pre><div class="hljs"><code class="lang-php"><span class="hljs-string">"([ab])\1"</span> =&gt; abcdebbcde
                   ^^
                    ¦-----这个就是因为前面的([ab])匹配到了一个字符b。我们可以用\<span class="hljs-number">1</span>来引用起之前结果
</code></div></pre>
<p>有时我们的匹配不需要捕获，因为捕获过程正则引擎会一直记录组号，组号数字也在增大，效率降低过多组号也不方便我们去使用，所以对应的还有 <strong>非捕获</strong>，写法相似，只需要在表达式括号内前面加上字符 <code>?:</code> 即可。</p>
<table>
<thead>
<tr>
<th>语法</th>
<th>表示含义</th>
<th>举例</th>
</tr>
</thead>
<tbody>
<tr>
<td>(a)</td>
<td>匹配 <code>a</code> 并捕获，设置组号</td>
<td>(\d{3})+\d</td>
</tr>
<tr>
<td>(?:a)</td>
<td>匹配 <code>a</code> 但不捕获</td>
<td>abc(?:d|e) 匹配 <code>abcd</code> 和 <code>abce</code></td>
</tr>
</tbody>
</table>
<blockquote>
<p>显然，如果一个复杂的表达式里面引入过多的非捕获，虽然可以减少正则引擎去记忆，但是这也会增加我们阅读正则表达式的难度，所以，请深思熟虑是否有必要为了这么一点性能而用非捕获。<br />
另一方面，在复杂的正则表达式中如果全部使用了捕获，试想一下这种情况:<br />
有天你突然把某个括号删除了，或者需要在中间某处增加一个括号，会产生什么样的影响？<br />
聪明的你应该想到了，会导致组号的变更。比如原来是\3,现在可能变成了\2或者\4，或者其他。<br />
所以捕获如果按照数字取名字实在不是很好。于是写 Python 正则的那群人说，要不给这些组取名字的事情交给用户吧，比如叫张三，李四。这种技术叫做<br />
命名捕获。大概是这么写的(?P<myname>hello) 它不仅具有原来数字的乳名\1，还有用户你自己为它取的名字myname。这种方式很棒，.Net觉得不错也抄袭了过去，只不过语法不一样罢了。</p>
</blockquote>
<p>参考来源：<a href="https://von.sh/2017/11/29/learn-regex-in-30-minutes" title="30分钟学正则" target="_blank">30分钟学正则</a></p>`;

export default content;