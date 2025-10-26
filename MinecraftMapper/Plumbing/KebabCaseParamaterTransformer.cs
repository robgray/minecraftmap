namespace MinecraftMapper.Plumbing;

using Microsoft.AspNetCore.Routing;
using System.Text.RegularExpressions;

public class KebabCaseParameterTransformer : IOutboundParameterTransformer
{
    public string TransformOutbound(object value)
    {
        if (value == null) return null;

        // Convert PascalCase/camelCase to kebab-case
        return Regex.Replace(
                value.ToString(),
                "(?<!^)([A-Z])",
                "-$1",
                RegexOptions.Compiled)
            .ToLower();
    }
}