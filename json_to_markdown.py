import json

def json_to_markdown(json_file, markdown_file):
    # 读取JSON文件
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 提取"second_translation"字段的内容
    markdown_content = data.get("second_translation", "")
    
    # 将内容写入Markdown文件
    with open(markdown_file, 'w', encoding='utf-8') as f:
        f.write(markdown_content)

# 使用函数
json_to_markdown('test.md', 'output.md')

print("转换完成。请查看 output.md 文件。")
